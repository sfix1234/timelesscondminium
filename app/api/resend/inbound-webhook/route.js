import { NextResponse } from 'next/server';
import { appendInboundEmailRow } from '../../../../lib/google-sheets';
import { decodeWebhookPayload, formatInboundRow, verifyResendWebhookSignature } from '../../../../lib/resend-webhook';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function fetchInboundEmailContent(emailId) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is required.');
  }

  const response = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch inbound email content: ${response.status} ${text}`);
  }

  return response.json();
}

export async function POST(request) {
  try {
    const rawPayload = await request.text();
    const secret = process.env.RESEND_WEBHOOK_SECRET;
    const svixId = request.headers.get('svix-id');
    const svixTimestamp = request.headers.get('svix-timestamp');
    const svixSignature = request.headers.get('svix-signature');

    const isValid = verifyResendWebhookSignature({
      payload: rawPayload,
      secret,
      svixId,
      svixTimestamp,
      svixSignature
    });

    if (!isValid) {
      return NextResponse.json({ ok: false, message: 'Invalid webhook signature.' }, { status: 401 });
    }

    const event = decodeWebhookPayload(rawPayload);
    if (!event || event.type !== 'email.received' || !event.data?.email_id) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const email = await fetchInboundEmailContent(event.data.email_id);
    const row = formatInboundRow({ event, email });
    await appendInboundEmailRow(row);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[resend/inbound-webhook] failed', error);
    return NextResponse.json({ ok: false, message: 'Webhook handling failed.' }, { status: 500 });
  }
}
