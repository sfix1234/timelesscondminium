const reserved = new Set(['admin', 'api', 'login', 'logout', 'signup', 'register', 'support', 'partners', 'management', 'activate', 'www', 'test']);

export function validSlug(value) {
  return typeof value === 'string' && /^[a-z0-9][a-z0-9_-]{1,46}[a-z0-9]$/.test(value)
    && !/[_-]{2}/.test(value) && !reserved.has(value);
}

export function slugFromName(name) {
  const slug = String(name || '').normalize('NFKC').trim().toLowerCase().replace(/\s+/g, '_');
  return validSlug(slug) ? slug : '';
}
