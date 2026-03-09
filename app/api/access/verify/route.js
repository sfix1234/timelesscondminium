import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ACCESS_SESSION_COOKIE,
  normalizeEmail,
  verifyAccessPassword
} from '../../../../lib/access-control';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);
    const password = String(body.password || '').trim().toUpperCase();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: 'メールアドレスとパスワードを入力してください。' },
        { status: 400 }
      );
    }

    const result = verifyAccessPassword(email, password);

    if (!result.ok) {
      const messageMap = {
        not_found: '先にフォーム送信を完了してください。',
        expired: 'パスワードの有効期限が切れています。再度フォーム送信を行ってください。',
        invalid: 'パスワードが正しくありません。'
      };

      return NextResponse.json(
        { ok: false, message: messageMap[result.reason] || '認証に失敗しました。' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ACCESS_SESSION_COOKIE, result.sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(result.sessionExpiresAt)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: '認証に失敗しました。' }, { status: 500 });
  }
}
