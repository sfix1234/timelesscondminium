import postgres from 'postgres';

let database;
function wrap(sql) {
  return {
    async query(text, values = []) { return { rows: await sql.unsafe(text, values) }; },
    transaction(fn) { return sql.begin(tx => fn(wrap(tx))); },
    close() { return sql.end(); }
  };
}
export function getDatabase() {
  // A disk-backed PostgreSQL-compatible database is available only for local
  // development. Vercel and production builds always require real PostgreSQL.
  if (process.env.NODE_ENV === 'development' && !process.env.VERCEL && process.env.PARTNER_LOCAL_DATA_DIR) {
    if (!database) {
      const local = import('@electric-sql/pglite').then(({ PGlite }) => new PGlite(process.env.PARTNER_LOCAL_DATA_DIR));
      database = {
        async query(text, values) { return (await local).query(text, values); },
        async transaction(fn) { return (await local).transaction(fn); },
        async close() { return (await local).close(); }
      };
    }
    return database;
  }
  if (!process.env.PARTNER_DATABASE_URL) throw new Error('PARTNER_DATABASE_URL is not configured');
  if (!database) {
    const hostname = new URL(process.env.PARTNER_DATABASE_URL).hostname;
    database = wrap(postgres(process.env.PARTNER_DATABASE_URL, {
      max: 3, prepare: false, connect_timeout: 10, idle_timeout: 20,
      ssl: process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1', '[::1]'].includes(hostname) ? false : 'require'
    }));
  }
  return database;
}
