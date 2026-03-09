import { NextResponse } from 'next/server';
import { issueAccessRequest, sendAccessEmail, validateAccessPayload } from '../../../../lib/access-control';

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

    return NextResponse.json({
      ok: true,
      expiresAt,
      devPassword: delivery.devPassword || null
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
