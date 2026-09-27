import { randomBytes, randomUUID } from 'node:crypto';
import { token, digest, mac, equal, hashPassword, checkPassword, encrypt, decrypt, newMfaSecret, totp, verifyTotp, readReferral } from './crypto.mjs';

export class PortalError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
const fail = (message, status) => { throw new PortalError(message, status); };
const clean = (value, max = 120) => String(value || '').trim().slice(0, max);
const userFields = 'id, email, name, company, role, code, active, created_at';
const safeUser = u => ({ id: u.id, email: u.email, name: u.name, company: u.company, role: u.role, code: u.code, active: u.active, created_at: u.created_at });
const uuid = value => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value || '');
export function validSlug(value) {
  return typeof value === 'string' && /^[a-z0-9][a-z0-9-]{1,46}[a-z0-9]$/.test(value) && !/--/.test(value)
    && !['admin', 'api', 'login', 'logout', 'signup', 'register', 'support', 'partners', 'management', 'activate', 'www', 'test'].includes(value);
}
export function createService({ db, secret, origin, adminPath }) {
  const adminUrl = `/management/${adminPath}`;
  const inviteUrl = t => `${origin}/partners/activate#token=${t}`;
  const one = async (sql, args = [], conn = db) => (await conn.query(sql, args)).rows[0];
  const audit = (conn, actor, action, target, details = {}) => conn.query(
    'INSERT INTO affiliate_audit(id,actor_id,action,target_id,details) VALUES($1,$2,$3,$4,$5)',
    [randomUUID(), actor || null, action, target || null, JSON.stringify(details)]
  );
  async function limit(bucket, key, max, seconds = 900) {
    const hash = mac(`rate:${bucket}:${key}`, secret);
    const row = await one(`INSERT INTO affiliate_rate_limits(key) VALUES($1)
      ON CONFLICT(key) DO UPDATE SET
      hits = CASE WHEN affiliate_rate_limits.window_start < now() - ($2 * interval '1 second') THEN 1 ELSE affiliate_rate_limits.hits + 1 END,
      window_start = CASE WHEN affiliate_rate_limits.window_start < now() - ($2 * interval '1 second') THEN now() ELSE affiliate_rate_limits.window_start END
      RETURNING hits`, [hash, seconds]);
    if (row.hits > max) fail('操作が続いています。しばらく待ってからお試しください。', 429);
  }
  function requireActor(actor, role) {
    if (!actor?.id || !actor.active) fail('ログインしてください。', 401);
    if (role && actor.role !== role) fail('この操作を行う権限がありません。', 403);
  }
  async function lockActor(conn, actor, role) {
    requireActor(actor, role);
    const current = await one(`SELECT ${userFields} FROM affiliate_users WHERE id=$1 FOR UPDATE`, [actor.id], conn);
    requireActor(current, role);
    return current;
  }
  async function session(conn, user) {
    const value = token();
    const seconds = user.role === 'admin' ? 7200 : 28800;
    await conn.query('INSERT INTO affiliate_sessions(hash,user_id,expires_at) VALUES($1,$2,now() + ($3 * interval \'1 second\'))', [digest(value), user.id, seconds]);
    return { value, seconds };
  }
  async function getActor(value) {
    if (!/^[a-zA-Z0-9_-]{43}$/.test(value || '')) return null;
    const row = await one(`SELECT u.* FROM affiliate_sessions s JOIN affiliate_users u ON u.id=s.user_id
      WHERE s.hash=$1 AND s.expires_at > now() AND u.active=true AND u.password_hash IS NOT NULL`, [digest(value)]);
    return row ? safeUser(row) : null;
  }
  async function newInvite(conn, userId) {
    const value = token();
    await conn.query('UPDATE affiliate_invites SET used_at=now() WHERE user_id=$1 AND used_at IS NULL', [userId]);
    await conn.query(`INSERT INTO affiliate_invites(hash,user_id,expires_at) VALUES($1,$2,now() + interval '48 hours')`, [digest(value), userId]);
    return inviteUrl(value);
  }
  async function login(input, ip) {
    const email = clean(input.email, 254).toLowerCase();
    const password = String(input.password || '');
    await limit('login-ip', ip, 40);
    await limit('login-email', email, 8);
    await limit('login-global', 'all', 200);
    if (password.length > 128 || !password) fail('メールアドレス・パスワード・確認コードを確認してください。', 401);
    const user = await one('SELECT * FROM affiliate_users WHERE email=$1', [email]);
    const valid = await checkPassword(password, user?.password_hash);
    const invalid = () => fail('メールアドレス・パスワード・確認コードを確認してください。', 401);
    if (!valid || !user?.active) return invalid();
    if (user.role === 'admin' && (!equal(input.adminKey || '', adminPath) || !user.mfa_secret)) return invalid();
    if (user.role === 'partner' && input.adminKey) return invalid();
    return db.transaction(async conn => {
      const current = await one('SELECT * FROM affiliate_users WHERE id=$1 FOR UPDATE', [user.id], conn);
      if (!current.active || current.password_hash !== user.password_hash) return invalid();
      if (current.role === 'admin') {
        const code = clean(input.code, 64).replace(/[\s-]/g, '');
        const step = verifyTotp(decrypt(current.mfa_secret, secret), code);
        if (step !== null && step > Number(current.last_totp_step)) {
          await conn.query('UPDATE affiliate_users SET last_totp_step=$1 WHERE id=$2', [step, user.id]);
        } else {
          const recovery = await one('DELETE FROM affiliate_recovery_codes WHERE hash=$1 AND user_id=$2 RETURNING hash', [digest(code.toUpperCase()), user.id], conn);
          if (!recovery) return invalid();
        }
      }
      const auth = await session(conn, current);
      await audit(conn, current.id, 'login', current.id);
      return { session: auth, destination: current.role === 'admin' ? adminUrl : '/partners' };
    });
  }
  async function inviteInfo(value, ip) {
    await limit('invite-read', ip, 80);
    if (!/^[a-zA-Z0-9_-]{43}$/.test(value || '')) fail('この設定リンクは無効です。再発行を依頼してください。', 410);
    return db.transaction(async conn => {
      const invite = await one(`SELECT i.*,u.email,u.name,u.role,u.active,u.password_hash FROM affiliate_invites i
        JOIN affiliate_users u ON u.id=i.user_id WHERE i.hash=$1 AND i.used_at IS NULL AND i.expires_at>now() FOR UPDATE OF i`, [digest(value)], conn);
      if (!invite?.active || (invite.role === 'admin' && invite.password_hash)) fail('設定リンクの有効期限が切れているか、すでに使用されています。', 410);
      let setup = null;
      if (invite.role === 'admin') {
        const raw = invite.enrollment_secret ? decrypt(invite.enrollment_secret, secret) : newMfaSecret();
        if (!invite.enrollment_secret) await conn.query('UPDATE affiliate_invites SET enrollment_secret=$1 WHERE hash=$2', [encrypt(raw, secret), digest(value)]);
        setup = { secret: raw, uri: totp(raw, invite.email).toString() };
      }
      return { name: invite.name, email: invite.email, admin: invite.role === 'admin', setup };
    });
  }
  async function activate(input, ip) {
    const value = String(input.token || '');
    await limit('activate-ip', ip, 20);
    await limit('activate-token', value, 8);
    if (!/^[a-zA-Z0-9_-]{43}$/.test(value)) fail('設定リンクが無効です。', 410);
    const password = String(input.password || '');
    if (password.length < 15 || password.length > 128) fail('パスワードは15〜128文字で設定してください。');
    // Check token before spending resources on the password KDF.
    const exists = await one('SELECT hash FROM affiliate_invites WHERE hash=$1 AND used_at IS NULL AND expires_at>now()', [digest(value)]);
    if (!exists) fail('設定リンクの有効期限が切れているか、すでに使用されています。', 410);
    const passwordHash = await hashPassword(password);
    return db.transaction(async conn => {
      // Lock user first, consistently with invitation issuance and account suspension.
      const owner = await one('SELECT user_id FROM affiliate_invites WHERE hash=$1', [digest(value)], conn);
      const user = owner && await one('SELECT * FROM affiliate_users WHERE id=$1 FOR UPDATE', [owner.user_id], conn);
      const invite = await one('SELECT * FROM affiliate_invites WHERE hash=$1 AND used_at IS NULL AND expires_at>now() FOR UPDATE', [digest(value)], conn);
      if (!invite || !user?.active || (user.role === 'admin' && user.password_hash)) fail('設定リンクの有効期限が切れているか、すでに使用されています。', 410);
      let recoveryCodes = [];
      if (user.role === 'admin') {
        if (!invite.enrollment_secret) fail('認証アプリの設定を先に行ってください。');
        const step = verifyTotp(decrypt(invite.enrollment_secret, secret), clean(input.code, 16));
        if (step === null) fail('認証アプリの6桁のコードを確認してください。');
        await conn.query('UPDATE affiliate_users SET mfa_secret=$1,last_totp_step=$2 WHERE id=$3', [invite.enrollment_secret, step, user.id]);
        recoveryCodes = Array.from({ length: 8 }, () => randomBytes(10).toString('hex').toUpperCase());
        await conn.query('DELETE FROM affiliate_recovery_codes WHERE user_id=$1', [user.id]);
        for (const code of recoveryCodes) await conn.query('INSERT INTO affiliate_recovery_codes(hash,user_id) VALUES($1,$2)', [digest(code), user.id]);
      }
      await conn.query('UPDATE affiliate_users SET password_hash=$1 WHERE id=$2', [passwordHash, user.id]);
      await conn.query('UPDATE affiliate_invites SET used_at=now(),enrollment_secret=NULL WHERE user_id=$1 AND used_at IS NULL', [user.id]);
      await conn.query('DELETE FROM affiliate_sessions WHERE user_id=$1', [user.id]);
      const auth = await session(conn, user);
      await audit(conn, user.id, 'password_set', user.id);
      return { session: auth, recoveryCodes, destination: user.role === 'admin' ? adminUrl : '/partners' };
    });
  }
  async function bootstrap(email, name = '管理者') {
    email = clean(email, 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('メールアドレスを確認してください。');
    return db.transaction(async conn => {
      // PostgreSQL advisory lock also serializes concurrent first-run initialization.
      await conn.query('SELECT pg_advisory_xact_lock(1783421)');
      let user = await one("SELECT * FROM affiliate_users WHERE role='admin' LIMIT 1 FOR UPDATE", [], conn);
      if (user && (user.email !== email || user.password_hash)) fail('管理者はすでに登録されています。初期設定は再実行できません。');
      if (!user) user = await one(`INSERT INTO affiliate_users(id,email,name,role,code) VALUES($1,$2,$3,'admin',$4) RETURNING *`, [randomUUID(), email, name, `AD${randomBytes(8).toString('hex').toUpperCase()}`], conn);
      return { setupUrl: await newInvite(conn, user.id), loginUrl: `${origin}${adminUrl}` };
    });
  }
  async function createUser(actor, input) {
    requireActor(actor, 'admin');
    const email = clean(input.email, 254).toLowerCase();
    const name = clean(input.name, 80); const company = clean(input.company, 120);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('担当者名とメールアドレスを入力してください。');
    try {
      return await db.transaction(async conn => {
        await lockActor(conn, actor, 'admin');
        const user = await one(`INSERT INTO affiliate_users(id,email,name,company,role,code) VALUES($1,$2,$3,$4,'partner',$5) RETURNING *`, [randomUUID(), email, name, company, `PT${randomBytes(8).toString('hex').toUpperCase()}`], conn);
        const url = await newInvite(conn, user.id);
        await audit(conn, actor.id, 'partner_created', user.id, { name });
        return { user: safeUser(user), inviteUrl: url };
      });
    } catch (error) { if (error.code === '23505') fail('このメールアドレスは登録済みです。'); throw error; }
  }
  async function updateUser(actor, id, input) {
    requireActor(actor, 'admin');
    if (!uuid(id)) fail('担当者が見つかりません。', 404);
    return db.transaction(async conn => {
      await lockActor(conn, actor, 'admin');
      const user = await one("SELECT * FROM affiliate_users WHERE id=$1 AND role='partner' FOR UPDATE", [id], conn);
      if (!user) fail('担当者が見つかりません。', 404);
      const active = typeof input.active === 'boolean' ? input.active : user.active;
      const name = input.name === undefined ? user.name : clean(input.name, 80);
      const company = input.company === undefined ? user.company : clean(input.company, 120);
      if (!name) fail('担当者名を入力してください。');
      await conn.query('UPDATE affiliate_users SET name=$1,company=$2,active=$3 WHERE id=$4', [name, company, active, id]);
      if (!active) {
        await conn.query('DELETE FROM affiliate_sessions WHERE user_id=$1', [id]);
        await conn.query('UPDATE affiliate_invites SET used_at=now(),enrollment_secret=NULL WHERE user_id=$1 AND used_at IS NULL', [id]);
      }
      await audit(conn, actor.id, 'partner_updated', id, { name, active });
      return { ok: true };
    });
  }
  async function reissue(actor, id) {
    requireActor(actor, 'admin');
    if (!uuid(id)) fail('担当者が見つかりません。', 404);
    return db.transaction(async conn => {
      await lockActor(conn, actor, 'admin');
      const user = await one("SELECT * FROM affiliate_users WHERE id=$1 AND role='partner' AND active=true FOR UPDATE", [id], conn);
      if (!user) fail('利用中の担当者が見つかりません。', 404);
      const url = await newInvite(conn, id);
      await audit(conn, actor.id, 'invite_reissued', id);
      return { inviteUrl: url };
    });
  }
  async function createLink(actor, input) {
    requireActor(actor, 'partner');
    const slug = String(input.slug || '').trim().toLowerCase(); const label = clean(input.label, 100);
    if (!validSlug(slug)) fail('URL名は3〜48文字の半角英小文字・数字・ハイフンで入力してください。先頭・末尾・連続したハイフンや予約語は使えません。');
    if (!label) fail('管理用の表示名を入力してください。');
    try {
      return await db.transaction(async conn => {
        const user = await lockActor(conn, actor, 'partner');
        const count = await one('SELECT count(*)::integer AS count FROM affiliate_links WHERE user_id=$1', [user.id], conn);
        if (count.count >= 100) fail('発行できるリンクは100件までです。管理者にご相談ください。');
        const link = await one('INSERT INTO affiliate_links(id,user_id,slug,label) VALUES($1,$2,$3,$4) RETURNING *', [randomUUID(), user.id, slug, label], conn);
        await audit(conn, user.id, 'link_created', link.id, { slug });
        return { link, url: `${origin}/r/${slug}` };
      });
    } catch (error) { if (error.code === '23505') fail('このURL名はすでに使われています。別の名前を指定してください。', 409); throw error; }
  }
  async function updateLink(actor, id, input) {
    requireActor(actor);
    if (!uuid(id)) fail('リンクが見つかりません。', 404);
    return db.transaction(async conn => {
      await lockActor(conn, actor);
      const link = await one('SELECT * FROM affiliate_links WHERE id=$1 AND ($2=\'admin\' OR user_id=$3) FOR UPDATE', [id, actor.role, actor.id], conn);
      if (!link) fail('リンクが見つかりません。', 404);
      const label = input.label === undefined ? link.label : clean(input.label, 100);
      if (!label) fail('管理用の表示名を入力してください。');
      const active = typeof input.active === 'boolean' ? input.active : link.active;
      await conn.query('UPDATE affiliate_links SET label=$1,active=$2 WHERE id=$3', [label, active, id]);
      await audit(conn, actor.id, 'link_updated', id, { active });
      return { ok: true };
    });
  }
  async function dashboard(actor) {
    requireActor(actor);
    const links = (await db.query(`SELECT l.*,u.name,u.company,u.code,u.active AS owner_active FROM affiliate_links l JOIN affiliate_users u ON u.id=l.user_id
      WHERE ($1='admin' OR l.user_id=$2) ORDER BY l.created_at DESC`, [actor.role, actor.id])).rows;
    const users = actor.role === 'admin' ? (await db.query(`SELECT ${userFields},(password_hash IS NOT NULL) AS activated,
      (SELECT count(*)::integer FROM affiliate_links l WHERE l.user_id=u.id) AS link_count FROM affiliate_users u WHERE role='partner' ORDER BY created_at DESC`)).rows : [];
    const activity = actor.role === 'admin' ? (await db.query(`SELECT a.action,a.created_at,a.details,u.name AS actor_name FROM affiliate_audit a LEFT JOIN affiliate_users u ON u.id=a.actor_id ORDER BY a.created_at DESC LIMIT 20`)).rows : [];
    return { user: safeUser(actor), links, users, activity, origin };
  }
  async function logout(value) { if (value) await db.query('DELETE FROM affiliate_sessions WHERE hash=$1', [digest(value)]); }
  async function publicLink(slug) {
    if (!validSlug(slug)) return null;
    return one(`SELECT l.id,l.slug,l.label,u.code,u.name,u.company FROM affiliate_links l JOIN affiliate_users u ON u.id=l.user_id
      WHERE l.slug=$1 AND l.active=true AND u.active=true AND u.password_hash IS NOT NULL AND u.role='partner'`, [slug]);
  }
  async function attribution(value) {
    const data = readReferral(value, secret);
    if (!data) return null;
    return one(`SELECT l.id,l.slug,l.label,u.code,u.name,u.company FROM affiliate_links l JOIN affiliate_users u ON u.id=l.user_id
      WHERE l.id=$1 AND l.active=true AND u.active=true AND u.role='partner' AND u.password_hash IS NOT NULL`, [data.linkId]);
  }
  return { getActor, login, inviteInfo, activate, bootstrap, createUser, updateUser, reissue, createLink, updateLink, dashboard, logout, publicLink, attribution, limit, adminUrl };
}
