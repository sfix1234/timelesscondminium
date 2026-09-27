// Isolated local preview with fictional accounts. Never used by production.
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
import { createService } from '../lib/affiliate/service.mjs';
import { token, totp } from '../lib/affiliate/crypto.mjs';

const directory = await mkdtemp(path.join(tmpdir(), 'timeless-partners-'));
const config = { secret: token(), adminPath: 'local-preview-admin-0123456789', origin: 'http://127.0.0.1:3100' };
const db = new PGlite(path.join(directory, 'db'));
await db.exec(await readFile(new URL('../lib/affiliate/schema.sql', import.meta.url), 'utf8'));
const service = createService({ db, ...config });
const password = 'Preview-only-account-2026!';
const value = url => new URLSearchParams(new URL(url).hash.slice(1)).get('token');
const setup = await service.bootstrap('admin@example.test', '管理者（プレビュー）');
const info = await service.inviteInfo(value(setup.setupUrl), 'preview');
const activated = await service.activate({ token: value(setup.setupUrl), password, code: totp(info.setup.secret).generate() }, 'preview');
const admin = await service.getActor(activated.session.value);
for (const [name, email, company, slug, label] of [
  ['山田 太郎', 'yamada@example.test', '京都パートナーズ', 'yamada-kyoto', '京都物件のご紹介用'],
  ['佐藤 花子', 'sato@example.test', '京町不動産', 'sato-kyoto', 'お客様へのご案内']
]) {
  const account = await service.createUser(admin, { name, email, company });
  const auth = await service.activate({ token: value(account.inviteUrl), password }, 'preview');
  await service.createLink(await service.getActor(auth.session.value), { slug, label });
}
const credentialsFile = path.join(directory, 'preview-credentials.json');
await writeFile(credentialsFile, JSON.stringify({ adminEmail: admin.email, partnerEmail: 'yamada@example.test', password, adminUrl: setup.loginUrl, recoveryCodes: activated.recoveryCodes, dataDirectory: directory }, null, 2), { mode: 0o600 });
await db.close();
console.log(`Preview credentials: ${credentialsFile}`);
console.log(`Partner preview: ${config.origin}/partners`);
console.log(`Admin preview: ${setup.loginUrl}`);
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3100'], {
  stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development', VERCEL: '', PARTNER_LOCAL_DATA_DIR: path.join(directory, 'db'),
    PARTNER_DATABASE_URL: 'postgres://local-preview', PARTNER_SECRET: config.secret, PARTNER_ADMIN_PATH: config.adminPath,
    PARTNER_ORIGIN: config.origin, PARTNER_PREVIEW_BUILD_DIR: '.next-partner-preview',
    RESEND_API_KEY: '', ACCESS_FROM_EMAIL: '', ACCESS_RECEIVING_EMAIL: '', ACCESS_RECIVING_EMAIL: '', ACCESS_ADMIN_EMAIL: '',
    GOOGLE_SERVICE_ACCOUNT_EMAIL: '', GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: '', GOOGLE_SHEETS_CONTACT_ID: '', GOOGLE_SHEETS_SPREADSHEET_ID: '' }
});
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
child.on('exit', code => { process.exitCode = code || 0; });
