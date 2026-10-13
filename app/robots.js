import { isSearchIndexingEnabled, SITE_URL } from '../lib/site-metadata';

export default function robots() {
  if (!isSearchIndexingEnabled()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/agent', '/thanks', '/partners', '/management', '/r/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
