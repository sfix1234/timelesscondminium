import { NextResponse } from 'next/server';
import { LEGACY_CODES, REFERRAL_COOKIE } from './lib/affiliate/config.mjs';

function isClientPreviewEnabled() {
  return String(process.env.CLIENT_PREVIEW_ENABLED || '').trim().toLowerCase() === 'true';
}

function createUnauthorizedResponse() {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Client Preview", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex'
    }
  });
}

function hasValidBasicAuth(request) {
  const configuredUser = String(process.env.CLIENT_PREVIEW_USERNAME || '').trim();
  const configuredPassword = String(process.env.CLIENT_PREVIEW_PASSWORD || '').trim();

  if (!configuredUser || !configuredPassword) {
    return false;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Basic ')) {
    return false;
  }

  try {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) return false;

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return username === configuredUser && password === configuredPassword;
  } catch {
    return false;
  }
}

export function middleware(request) {
  if (isClientPreviewEnabled()) {
    if (!hasValidBasicAuth(request)) {
      return createUnauthorizedResponse();
    }
  }

  const pathname = request.nextUrl.pathname;
  const isPortal = /^\/(partners|management|api\/partners)(\/|$)/.test(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-partner-portal', isPortal ? '1' : '0');
  let csp;
  if (isPortal) {
    const nonce = btoa(crypto.randomUUID());
    csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'; object-src 'none'`;
    requestHeaders.set('Content-Security-Policy', csp);
    requestHeaders.set('x-nonce', nonce);
  } else {
    requestHeaders.delete('x-nonce');
    requestHeaders.delete('Content-Security-Policy');
  }
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (isPortal) {
    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('Referrer-Policy', 'no-referrer');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  if (LEGACY_CODES.has((request.nextUrl.searchParams.get('utm_source') || '').toUpperCase())) {
    response.cookies.delete(REFERRAL_COOKIE);
  }

  if (isClientPreviewEnabled()) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
