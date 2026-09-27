import { cookies } from 'next/headers';
import { getDatabase } from './db.mjs';
import { getConfig, configured, SESSION_COOKIE } from './config.mjs';
import { createService } from './service.mjs';

export function portal() { return createService({ db: getDatabase(), ...getConfig() }); }
export async function currentActor() {
  if (!configured()) return null;
  const jar = await cookies();
  return portal().getActor(jar.get(SESSION_COOKIE)?.value);
}
