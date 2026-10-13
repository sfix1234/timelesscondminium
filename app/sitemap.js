import { isSearchIndexingEnabled, SITE_URL } from '../lib/site-metadata';

export default function sitemap() {
  return isSearchIndexingEnabled() ? [{ url: `${SITE_URL}/` }] : [];
}
