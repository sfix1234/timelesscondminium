import { createSign } from 'node:crypto';

function toBase64Url(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function normalizePrivateKey(privateKey) {
  return String(privateKey || '').replace(/\\n/g, '\n');
}

async function getGoogleAccessToken() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY are required.');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: nowSeconds,
    exp: nowSeconds + 3600
  };

  const unsignedJwt = `${toBase64Url(header)}.${toBase64Url(payload)}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  signer.end();
  const signature = signer.sign(privateKey, 'base64url');
  const assertion = `${unsignedJwt}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to obtain Google access token: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function getFirstSheetTitle({ spreadsheetId, accessToken }) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}?fields=sheets.properties.title`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to read spreadsheet metadata: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data?.sheets?.[0]?.properties?.title || 'Sheet1';
}

export async function appendInboundEmailRow(values) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is required.');
  }

  const accessToken = await getGoogleAccessToken();
  const sheetTitle = await getFirstSheetTitle({ spreadsheetId, accessToken });
  const range = `${sheetTitle}!A:R`;
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [values]
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to append row to Google Sheets: ${response.status} ${text}`);
  }

  return response.json();
}
