'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './portal.module.css';

async function api(path, body) {
  const response = await fetch(`/api/partners/${path}`, {
    method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin', cache: 'no-store',
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  const data = await response.json();
  if (!response.ok) { const error = new Error(data.error || '操作を完了できませんでした。'); error.status = response.status; throw error; }
  return data;
}
function Arrow() { return <span aria-hidden="true">↗</span>; }
function Brand() { return <a className={styles.brand} href="/" aria-label="THE TIMELESS CONDOMINIUM トップ"><img src="/assets/images/hero-center-logo.png" alt="TIMELESS" width="660" height="129" /><span>PARTNER PORTAL</span></a>; }
function Alert({ children, success = false }) { return children ? <p role={success ? 'status' : 'alert'} className={success ? styles.success : styles.error}>{children}</p> : null; }
function Password({ label = 'パスワード', name = 'password', minLength, autoComplete = 'current-password' }) {
  const [visible, setVisible] = useState(false);
  return <label className={styles.field}><span>{label}</span><span className={styles.password}><input type={visible ? 'text' : 'password'} name={name} required minLength={minLength} maxLength={128} autoComplete={autoComplete} /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'パスワードを隠す' : 'パスワードを表示'}>{visible ? '隠す' : '表示'}</button></span></label>;
}
function AuthShell({ children, admin = false }) {
  return <main className={styles.portal}><div className={styles.auth}>
    <aside className={styles.authAside}><Brand /><div><span className={styles.eyebrow}>A CONNECTION THAT LASTS</span><h1>出会いを、<br />その先の価値へ。</h1><p>THE TIMELESS CONDOMINIUM<br />紹介パートナー専用ポータル</p></div><span className={styles.asideFoot}>{admin ? 'ADMINISTRATOR ACCESS' : 'PARTNER ACCESS'}</span></aside>
    <section className={styles.authMain}>{children}<p className={styles.authFoot}>© THE TIMELESS CONDOMINIUM</p></section>
  </div></main>;
}
export function Unavailable() { return <AuthShell><div className={styles.authCard}><span className={styles.eyebrow}>PARTNER PORTAL</span><h2>現在準備中です</h2><p className={styles.muted}>ご利用開始の案内までお待ちください。</p><a className={styles.secondary} href="/">サイトへ戻る</a></div></AuthShell>; }
export function Login({ adminKey = '' }) {
  const [pending, setPending] = useState(false); const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget));
    setPending(true); setError('');
    try { const result = await api('login', { ...data, adminKey }); window.location.assign(result.destination); }
    catch (e) { setError(e.message); setPending(false); }
  }
  return <AuthShell admin={Boolean(adminKey)}><div className={styles.authCard}>
    <span className={styles.eyebrow}>{adminKey ? 'ADMINISTRATOR' : 'WELCOME BACK'}</span>
    <h2>{adminKey ? '管理者ログイン' : '担当者ログイン'}</h2>
    <p className={styles.muted}>{adminKey ? '担当者と紹介リンクを管理します。' : 'あなたの紹介リンクを発行・管理できます。'}</p>
    <form onSubmit={submit}><fieldset disabled={pending} className={styles.fields}>
      <label className={styles.field}><span>メールアドレス</span><input name="email" type="email" required maxLength={254} autoComplete="username" /></label>
      <Password />
      {adminKey && <label className={styles.field}><span>認証アプリの確認コード</span><input name="code" required autoComplete="one-time-code" maxLength={40} placeholder="6桁のコード、または復旧コード" /><small>認証アプリを利用できない場合は復旧コードを入力してください。</small></label>}
      <Alert>{error}</Alert><button className={styles.primary} type="submit">{pending ? 'ログイン中…' : 'ログイン'} <Arrow /></button>
    </fieldset></form>
    <div className={styles.note}>{adminKey ? '管理者専用の入口です。ログイン情報は他の方と共有しないでください。' : '初めての方は、管理者から届いた初期設定URLを開いてください。パスワードを忘れた場合も、管理者へ再設定URLの発行をご依頼ください。'}</div>
  </div></AuthShell>;
}
export function Activate() {
  const initialized = useRef(false);
  const [inviteToken, setInviteToken] = useState(''); const [invite, setInvite] = useState(null);
  const [error, setError] = useState(''); const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null); const [saved, setSaved] = useState(false); const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const value = new URLSearchParams(window.location.hash.slice(1)).get('token');
    window.history.replaceState(null, '', window.location.pathname);
    if (!value) { setError('初期設定URLを確認して、案内されたリンクをもう一度開いてください。'); return; }
    setInviteToken(value);
    api('invite', { token: value }).then(setInvite).catch(e => setError(e.message));
  }, []);
  async function submit(event) {
    event.preventDefault(); const values = Object.fromEntries(new FormData(event.currentTarget));
    if (values.password !== values.confirmPassword) { setError('パスワードが一致しません。'); return; }
    setPending(true); setError('');
    try {
      const data = await api('activate', { token: inviteToken, password: values.password, code: values.code });
      setResult(data); setInvite(null); setInviteToken('');
      if (!data.recoveryCodes?.length) window.location.assign(data.destination);
    } catch (e) { setError(e.message); } finally { setPending(false); }
  }
  if (result?.recoveryCodes?.length) return <AuthShell admin><div className={styles.authCard}>
    <span className={styles.eyebrow}>ACCOUNT READY</span><h2>復旧コードを保存</h2><p className={styles.muted}>認証アプリを利用できなくなった際に使います。各コードは1回限り有効です。この画面を閉じると再表示できません。</p>
    <div className={styles.recovery}>{result.recoveryCodes.map(code => <code key={code}>{code}</code>)}</div>
    <button className={styles.secondary} onClick={async () => { try { await navigator.clipboard.writeText(result.recoveryCodes.join('\n')); setCopied(true); } catch { setError('コードを選択してコピーしてください。'); } }}>{copied ? 'コピーしました' : '復旧コードをコピー'}</button>
    <label className={styles.checkbox}><input type="checkbox" checked={saved} onChange={e => setSaved(e.target.checked)} />安全な場所に保存しました</label>
    <p className={styles.note}>次回のログイン用に、移動先の管理画面をブックマークしてください。</p><Alert>{error}</Alert>
    <button className={styles.primary} disabled={!saved} onClick={() => window.location.assign(result.destination)}>管理画面を開く <Arrow /></button>
  </div></AuthShell>;
  return <AuthShell admin={invite?.admin}><div className={styles.authCard}>
    <span className={styles.eyebrow}>GET STARTED</span><h2>アカウントの初期設定</h2>
    {!invite && !error && <p className={styles.muted}>設定リンクを確認しています…</p>}
    {invite && <><p className={styles.muted}>{invite.name} 様<br />{invite.email}</p><form onSubmit={submit}><fieldset disabled={pending} className={styles.fields}>
      <Password label="新しいパスワード" minLength={15} autoComplete="new-password" /><small className={styles.muted}>15〜128文字。他のサービスで使っていないパスワードを設定してください。</small>
      <Password label="パスワードを再入力" name="confirmPassword" minLength={15} autoComplete="new-password" />
      {invite.setup && <div className={styles.mfa}><h3>認証アプリを登録</h3><p>Google Authenticatorなどの認証アプリでQRコードを読み取ってください。</p><img src={invite.setup.qr} alt="認証アプリ登録用QRコード" width="220" height="220" /><details><summary>QRコードを読み取れない場合</summary><p>認証アプリに次のキーを手動で登録してください。</p><code className={styles.breakAll}>{invite.setup.secret}</code></details><label className={styles.field}><span>認証アプリに表示された6桁のコード</span><input name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required autoComplete="one-time-code" /></label></div>}
      <Alert>{error}</Alert><button className={styles.primary}>{pending ? '設定しています…' : '設定を完了する'} <Arrow /></button>
    </fieldset></form></>}
    {!invite && <Alert>{error}</Alert>}
  </div></AuthShell>;
}
function Copy({ value, label = 'コピー' }) {
  const [copied, setCopied] = useState(false); const [error, setError] = useState(false);
  return <><button className={styles.smallButton} onClick={async () => { try { await navigator.clipboard.writeText(value); setCopied(true); setError(false); setTimeout(() => setCopied(false), 2500); } catch { setError(true); } }}>{copied ? 'コピー済み ✓' : label}</button>{error && <small role="alert">URLを選択してコピーしてください。</small>}</>;
}
const date = value => new Date(value).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' });
const actions = { login: 'ログイン', partner_created: '担当者を登録', partner_updated: '担当者情報を更新', invite_reissued: '設定URLを再発行', password_set: 'パスワードを設定', link_created: '紹介リンクを発行', link_updated: '紹介リンクを更新' };
export function Dashboard({ user, adminKey = '' }) {
  const admin = user.role === 'admin';
  const [data, setData] = useState(null); const [tab, setTab] = useState(admin ? 'users' : 'links');
  const [error, setError] = useState(''); const [notice, setNotice] = useState(''); const [pending, setPending] = useState(false);
  const [search, setSearch] = useState(''); const [slug, setSlug] = useState(''); const [issued, setIssued] = useState('');
  const [edit, setEdit] = useState(null); const [inviteUrl, setInviteUrl] = useState('');
  useEffect(() => {
    if (!edit && !inviteUrl) return;
    const previous = document.activeElement;
    const dialog = document.querySelector('[role="dialog"]');
    const focusable = () => Array.from(dialog?.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea,a[href]') || []);
    focusable()[0]?.focus();
    const trap = event => {
      if (event.key !== 'Tab') return;
      const nodes = focusable(); const first = nodes[0]; const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => { document.removeEventListener('keydown', trap); previous?.focus(); };
  }, [Boolean(edit), Boolean(inviteUrl)]);
  async function refresh() {
    try { setData(await api('state')); }
    catch (e) { if (e.status === 401) window.location.reload(); else setError(e.message); }
  }
  useEffect(() => { refresh(); }, []);
  async function mutate(path, body, success, callback) {
    setPending(true); setError(''); setNotice('');
    try { const result = await api(path, body); if (callback) callback(result); await refresh(); setNotice(success); return true; }
    catch (e) { setError(e.message); return false; } finally { setPending(false); }
  }
  async function createAccount(event) {
    event.preventDefault(); const form = event.currentTarget; const values = Object.fromEntries(new FormData(form));
    if (await mutate('users', values, '担当者を登録しました。初期設定URLを担当者にお渡しください。', r => setInviteUrl(r.inviteUrl))) form.reset();
  }
  async function createLink(event) {
    event.preventDefault(); const form = event.currentTarget; const values = Object.fromEntries(new FormData(form));
    if (await mutate('links', values, '紹介リンクを発行しました。', r => setIssued(r.url))) { form.reset(); setSlug(''); }
  }
  const users = (data?.users || []).filter(u => `${u.name} ${u.company} ${u.email}`.toLowerCase().includes(search.toLowerCase()));
  const links = (data?.links || []).filter(l => `${l.label} ${l.slug} ${l.name} ${l.company}`.toLowerCase().includes(search.toLowerCase()));
  return <main className={styles.portal}>
    <header className={styles.header}><Brand /><div className={styles.identity}><span className={styles.role}>{admin ? '管理者' : 'パートナー'}</span><span>{user.name} 様</span><button disabled={pending} onClick={async () => { setPending(true); try { await api('logout', {}); window.location.assign(admin ? `/management/${adminKey}` : '/partners'); } catch(e) { setError(e.message); setPending(false); } }}>ログアウト</button></div></header>
    <div className={styles.main}>
      <div className={styles.pageHeading}><div><span className={styles.eyebrow}>{admin ? 'PARTNER MANAGEMENT' : 'YOUR CONNECTIONS'}</span><h1>{admin ? '紹介パートナー管理' : '紹介リンク管理'}</h1><p className={styles.muted}>{admin ? '担当者の登録と、紹介リンクの利用状況を管理します。' : 'あなたらしいURLで、特別な出会いをつなぎましょう。'}</p></div><a href="/" className={styles.textLink}>サイトを見る <Arrow /></a></div>
      <div className={styles.stats}>
        <div><span>{admin ? '登録担当者' : '発行したリンク'}</span><strong>{data ? (admin ? data.users.length : data.links.length) : '—'}<small>件</small></strong></div>
        <div><span>{admin ? '利用中の担当者' : '利用中のリンク'}</span><strong>{data ? (admin ? data.users.filter(u => u.active && u.activated).length : data.links.filter(l => l.active).length) : '—'}<small>件</small></strong></div>
        <div><span>{admin ? '発行済みリンク' : 'あなたの紹介コード'}</span>{admin ? <strong>{data?.links.length ?? '—'}<small>件</small></strong> : <code className={styles.partnerCode}>{user.code}</code>}</div>
      </div>
      <Alert>{error}</Alert><Alert success>{notice}</Alert>
      {admin ? <section className={styles.card}><div className={styles.cardHeading}><div><span className={styles.eyebrow}>INVITE A PARTNER</span><h2>担当者を登録</h2></div><p>登録後に発行される初期設定URLを<br />担当者へお渡しください。</p></div>
        <form onSubmit={createAccount}><fieldset disabled={pending} className={styles.createGrid}>
          <label className={styles.field}><span>担当者名 <b>必須</b></span><input name="name" required maxLength={80} placeholder="山田 太郎" /></label>
          <label className={styles.field}><span>会社名</span><input name="company" maxLength={120} placeholder="株式会社〇〇" /></label>
          <label className={styles.field}><span>メールアドレス <b>必須</b></span><input name="email" type="email" required maxLength={254} placeholder="name@example.com" /></label>
          <button className={styles.primary} type="submit">担当者を登録 <span aria-hidden="true">＋</span></button>
        </fieldset></form>
      </section> : <section className={styles.card}><div className={styles.cardHeading}><div><span className={styles.eyebrow}>CREATE A LINK</span><h2>新しい紹介リンク</h2></div><p>URLの末尾を自由に設定できます。</p></div>
        <form onSubmit={createLink}><fieldset disabled={pending} className={styles.linkForm}>
          <label className={styles.field}><span>管理用の表示名 <b>必須</b></span><input name="label" required maxLength={100} placeholder="例：京都物件のご紹介用" /><small>日本語で設定できます。管理画面に表示される名前です。</small></label>
          <label className={styles.field}><span>URL名 <b>必須</b></span><input name="slug" required value={slug} onChange={e => setSlug(e.target.value.toLowerCase())} minLength={3} maxLength={48} pattern="[a-z0-9][a-z0-9-]{1,46}[a-z0-9]" placeholder="例：yamada-kyoto" autoCapitalize="none" spellCheck="false" /><small>3〜48文字の半角英数字・ハイフン。発行後のURL名は変更できません。</small></label>
          <div className={styles.urlPreview}><span>発行されるURL</span><code>{data?.origin || 'https://timelesscondominium.com'}/r/<strong>{slug || 'あなたのURL名'}</strong></code></div>
          <button className={styles.primary} type="submit">{pending ? '発行しています…' : '紹介リンクを発行'} <Arrow /></button>
        </fieldset></form>
        {issued && <div className={styles.issued}><span>発行した紹介リンク</span><code>{issued}</code><Copy value={issued} label="紹介リンクをコピー" /></div>}
      </section>}
      <section className={styles.listSection}>
        <div className={styles.listHead}><div className={styles.tabs} role="tablist" aria-label="表示する一覧">
          {admin && <button role="tab" aria-selected={tab === 'users'} onClick={() => { setTab('users'); setSearch(''); }}>担当者一覧</button>}
          <button role="tab" aria-selected={tab === 'links'} onClick={() => { setTab('links'); setSearch(''); }}>紹介リンク一覧</button>
          {admin && <button role="tab" aria-selected={tab === 'activity'} onClick={() => { setTab('activity'); setSearch(''); }}>操作履歴</button>}
        </div>{tab !== 'activity' && <label className={styles.search}><span className={styles.srOnly}>一覧を検索</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder={tab === 'users' ? '担当者・会社名で検索' : 'リンク名・URL名で検索'} /></label>}</div>
        {!data ? <div className={styles.empty}>読み込んでいます…</div> : tab === 'users' ? <div className={styles.rows}>
          {!users.length && <div className={styles.empty}>{search ? '一致する担当者がいません。' : '担当者はまだ登録されていません。上のフォームから最初の担当者を登録できます。'}</div>}
          {users.map(u => <article className={styles.userRow} key={u.id}><div className={styles.avatar} aria-hidden="true">{u.name.slice(0, 1)}</div><div className={styles.rowMain}><div className={styles.rowTitle}><h3>{u.name}</h3><span className={u.active && u.activated ? styles.badge : styles.badgeOff}>{!u.active ? '利用停止' : u.activated ? '利用中' : '初期設定待ち'}</span></div><p>{u.company || '会社名未登録'} <span>·</span> {u.email}</p><small>紹介コード {u.code} · リンク {u.link_count}件</small></div><div className={styles.rowActions}><button className={styles.smallButton} disabled={pending || !u.active} onClick={() => mutate(`users/${u.id}/invite`, {}, '以前の設定URLは無効になりました。新しいURLを担当者へお渡しください。', r => setInviteUrl(r.inviteUrl))}>設定URLを再発行</button><button className={styles.smallButton} disabled={pending} onClick={() => { setError(''); setEdit({ type: 'user', ...u }); }}>編集</button></div></article>)}
        </div> : tab === 'links' ? <div className={styles.rows}>
          {!links.length && <div className={styles.empty}>{search ? '一致する紹介リンクがありません。' : admin ? '担当者が発行した紹介リンクがここに表示されます。' : '紹介リンクはまだありません。上のフォームから最初のリンクを発行しましょう。'}</div>}
          {links.map(l => <article className={styles.linkRow} key={l.id}><div className={styles.rowMain}><div className={styles.rowTitle}><h3>{l.label}</h3><span className={l.active && l.owner_active ? styles.badge : styles.badgeOff}>{l.active && l.owner_active ? '利用中' : '停止中'}</span></div><code className={styles.linkUrl}>{data.origin}/r/{l.slug}</code><small>{admin && `${l.company ? l.company + ' / ' : ''}${l.name} · `}{date(l.created_at)} 発行</small></div><div className={styles.rowActions}><Copy value={`${data.origin}/r/${l.slug}`} /><button className={styles.smallButton} disabled={pending} onClick={() => { setError(''); setEdit({ type: 'link', ...l }); }}>編集</button></div></article>)}
        </div> : <div className={styles.rows}>{!data.activity.length && <div className={styles.empty}>操作履歴はありません。</div>}{data.activity.map((a, i) => <div className={styles.activity} key={`${a.created_at}-${i}`}><span>{actions[a.action] || a.action}</span><span>{a.actor_name || 'システム'}</span><time>{new Date(a.created_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</time></div>)}</div>}
      </section>
      <footer className={styles.footer}><span>THE TIMELESS CONDOMINIUM</span><span>PARTNER PORTAL</span></footer>
    </div>
    {inviteUrl && <div className={styles.backdrop}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="invite-heading"><span className={styles.eyebrow}>ACCOUNT INVITATION</span><h2 id="invite-heading">初期設定URLを発行しました</h2><p>担当者本人に、このURLをお渡しください。パスワードは担当者が設定します。</p><div className={styles.inviteBox}><textarea readOnly aria-label="担当者の初期設定URL" value={inviteUrl} rows={4} /><Copy value={inviteUrl} label="初期設定URLをコピー" /></div><p className={styles.note}>有効期限は48時間、利用は1回限りです。後から再発行できます。ログイン画面：{data?.origin}/partners</p><button className={styles.primary} onClick={() => setInviteUrl('')}>閉じる</button></section></div>}
    {edit && <div className={styles.backdrop}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="edit-heading"><h2 id="edit-heading">{edit.type === 'user' ? '担当者情報を編集' : '紹介リンクを編集'}</h2>
      <form onSubmit={async event => { event.preventDefault(); const values = Object.fromEntries(new FormData(event.currentTarget)); const ok = await mutate(`${edit.type === 'user' ? 'users' : 'links'}/${edit.id}`, { ...values, active: values.active === 'on' }, '変更を保存しました。'); if (ok) setEdit(null); }}><fieldset disabled={pending} className={styles.fields}>
        <label className={styles.field}><span>{edit.type === 'user' ? '担当者名' : '管理用の表示名'}</span><input autoFocus name={edit.type === 'user' ? 'name' : 'label'} required maxLength={edit.type === 'user' ? 80 : 100} defaultValue={edit.type === 'user' ? edit.name : edit.label} /></label>
        {edit.type === 'user' && <label className={styles.field}><span>会社名</span><input name="company" defaultValue={edit.company} maxLength={120} /></label>}
        <label className={styles.checkbox}><input type="checkbox" name="active" defaultChecked={edit.active} />利用を有効にする</label>
        <p className={styles.note}>{edit.type === 'user' ? '停止するとログインと全紹介リンクが無効になります。再開すると紹介リンクも再び利用できます。' : '停止すると、この紹介リンクからの案内が無効になります。URL名は変更・再利用されません。'}</p><Alert>{error}</Alert><div className={styles.modalActions}><button type="button" className={styles.secondary} onClick={() => setEdit(null)}>キャンセル</button><button className={styles.primary} type="submit">{pending ? '保存中…' : '変更を保存'}</button></div>
      </fieldset></form>
    </section></div>}
  </main>;
}
