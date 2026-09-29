import { readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import nextEnv from '@next/env';
import { getDatabase } from '../lib/affiliate/db.mjs';
import { getConfig } from '../lib/affiliate/config.mjs';
import { createService } from '../lib/affiliate/service.mjs';

nextEnv.loadEnvConfig(process.cwd());
const [command, ...args] = process.argv.slice(2);
if (command === 'generate-config') {
  const output = args[0];
  if (!output) throw new Error('Specify a private output file');
  await writeFile(output, `PARTNER_SECRET=${randomBytes(32).toString('base64url')}\nPARTNER_ADMIN_PATH=${randomBytes(24).toString('base64url')}\nPARTNER_ORIGIN=https://timelesscondominium.com\n`, { mode: 0o600, flag: 'wx' });
  console.log(`Private configuration saved: ${output}`);
} else if (command === 'migrate') {
  getConfig();
  const db = getDatabase();
  try {
    const migration = await readFile(new URL('../lib/affiliate/migrations/002_named_referrals.sql', import.meta.url), 'utf8');
    await db.transaction(async tx => {
      for (const statement of migration.split(';').map(s => s.trim()).filter(Boolean)) await tx.query(statement);
    });
    console.log('Named referral URL migration completed.');
  } finally { await db.close(); }
} else if (command === 'init') {
  const [email, output] = args;
  if (!email || !output) throw new Error('Usage: node scripts/affiliate-admin.mjs init <admin-email> <private-output-file>');
  // Require a working full configuration before touching the database.
  const config = getConfig();
  const db = getDatabase();
  try {
    const schema = await readFile(new URL('../lib/affiliate/schema.sql', import.meta.url), 'utf8');
    await db.transaction(async tx => {
      for (const statement of schema.split(';').map(s => s.trim()).filter(Boolean)) await tx.query(statement);
    });
    const result = await createService({ db, ...config }).bootstrap(email);
    await writeFile(output, `管理者: ${email}\n管理者ログインURL: ${result.loginUrl}\n初期設定URL（48時間・1回限り）: ${result.setupUrl}\n\n初期設定でパスワードと認証アプリを登録し、復旧コードを保存してください。\nこのファイルは管理者以外に共有しないでください。\n`, { mode: 0o600 });
    console.log(`Admin setup saved privately: ${output}`);
  } finally { await db.close(); }
} else {
  console.log('Commands: generate-config <private-output-file> | init <admin-email> <private-output-file> | migrate');
  process.exitCode = 1;
}
