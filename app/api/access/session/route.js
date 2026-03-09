import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_SESSION_COOKIE, getSessionRecord } from '../../../../lib/access-control';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ACCESS_SESSION_COOKIE)?.value;
  const record = getSessionRecord(sessionToken);

  return NextResponse.json({
    ok: true,
    unlocked: Boolean(record)
  });
}
