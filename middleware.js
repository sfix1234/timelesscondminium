import { NextResponse } from 'next/server';

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

  const response = NextResponse.next();

  if (isClientPreviewEnabled()) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
