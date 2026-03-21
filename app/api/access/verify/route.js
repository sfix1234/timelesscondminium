import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ACCESS_REQUEST_COOKIE,
  ACCESS_SESSION_COOKIE,
  normalizeEmail,
  verifyAccessPassword,
  verifyDirectAccessPassword
} from '../../../../lib/access-control';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);
    const password = String(body.password || '').trim();
    const hostname = request.nextUrl.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const cookieStore = await cookies();
    const pendingAccessToken = cookieStore.get(ACCESS_REQUEST_COOKIE)?.value;

    if (!password) {
      return NextResponse.json(
        { ok: false, message: email ? '認証パスワードを入力してください。' : 'パスワードを入力してください。' },
        { status: 400 }
      );
    }

    const result = email
      ? verifyAccessPassword(email, password.toUpperCase(), pendingAccessToken)
      : verifyDirectAccessPassword(password);

    if (!result.ok) {
      const messageMap = email
        ? {
            not_found: '先にフォーム送信を完了してください。',
            expired: 'パスワードの有効期限が切れています。再度フォーム送信を行ってください。',
            invalid: '認証パスワードが正しくありません。'
          }
        : {
            config_missing: 'アクセスパスワードが未設定です。.env を確認してください。',
            invalid: 'パスワードが正しくありません。'
          };

      return NextResponse.json(
        { ok: false, message: messageMap[result.reason] || '認証に失敗しました。' },
        { status: 400 }
      );
    }

    cookieStore.set(ACCESS_SESSION_COOKIE, result.sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' && !isLocalhost,
      path: '/',
      expires: new Date(result.sessionExpiresAt)
    });
    if (email) {
      cookieStore.delete(ACCESS_REQUEST_COOKIE);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: '認証に失敗しました。' }, { status: 500 });
  }
}
