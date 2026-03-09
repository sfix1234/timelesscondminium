import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ACCESS_REQUEST_COOKIE,
  createPendingAccessToken,
  issueAccessRequest,
  sendAccessEmail,
  validateAccessPayload
} from '../../../../lib/access-control';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validateAccessPayload(payload);

    if (!validation.isValid) {
      return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
    }

    const { password, expiresAt } = issueAccessRequest(validation.clean);
    const delivery = await sendAccessEmail({
      email: validation.clean.email,
      name: validation.clean.name,
      password,
      expiresAt
    });
    const cookieStore = await cookies();
    const pendingAccessToken = createPendingAccessToken({
      email: validation.clean.email,
      password,
      expiresAt
    });
    cookieStore.set(ACCESS_REQUEST_COOKIE, pendingAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(expiresAt)
    });

    return NextResponse.json({
      ok: true,
      expiresAt,
      devPassword: delivery.devPassword || null
    });
  } catch (error) {
    const code = error?.code || 'unexpected_error';
    console.error('[access/request] failed', {
      code,
      message: error?.message || 'unknown error'
    });

    const messageMap = {
      mail_config_missing: 'メール送信設定が未完了です。時間をおいて再度お試しください。',
      mail_delivery_failed: 'メール送信に失敗しました。時間をおいて再度お試しください。',
      auth_config_missing: '認証設定が未完了です。時間をおいて再度お試しください。'
    };

    return NextResponse.json(
      {
        ok: false,
        code,
        message: messageMap[code] || '送信に失敗しました。時間をおいて再度お試しください。'
      },
      { status: 500 }
    );
  }
}
