import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_SESSION_COOKIE, verifyAgentPassword } from '../../../../lib/access-control';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const password = String(body.password || '').trim();
    const hostname = request.nextUrl.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    if (!password) {
      return NextResponse.json({ ok: false, message: 'パスワードを入力してください。' }, { status: 400 });
    }

    const result = verifyAgentPassword(password);

    if (!result.ok) {
      const messageMap = {
        config_missing: 'AGENT_PASSWORD が未設定です。.env を確認してください。',
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
      secure: process.env.NODE_ENV === 'production' && !isLocalhost,
      path: '/',
      expires: new Date(result.sessionExpiresAt)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: '認証に失敗しました。' }, { status: 500 });
  }
}
