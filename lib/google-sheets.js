import { createSign } from 'node:crypto';
import { INBOUND_SHEET_HEADERS } from './resend-webhook';

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

async function ensureHeaderRow({ spreadsheetId, accessToken, sheetTitle }) {
  const headerRange = `${sheetTitle}!A1:R1`;
  const readResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!readResponse.ok) {
    const text = await readResponse.text();
    throw new Error(`Failed to read spreadsheet headers: ${readResponse.status} ${text}`);
  }

  const currentValues = (await readResponse.json())?.values?.[0] || [];
  const expectedHeader = JSON.stringify(INBOUND_SHEET_HEADERS);
  const currentHeader = JSON.stringify(currentValues);

  if (currentHeader === expectedHeader) {
    return;
  }

  const updateResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [INBOUND_SHEET_HEADERS]
      })
    }
  );

  if (!updateResponse.ok) {
    const text = await updateResponse.text();
    throw new Error(`Failed to update spreadsheet headers: ${updateResponse.status} ${text}`);
  }
}

const REGISTRATION_SHEET_HEADERS = ['登録日時', '氏名', 'メールアドレス', '国番号', '電話番号', '資産額'];
const REGISTRATION_SHEET_NAME = '登録';

export async function appendRegistrationRow(values) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_CONTACT_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_CONTACT_ID or GOOGLE_SHEETS_SPREADSHEET_ID is required.');
  }

  const accessToken = await getGoogleAccessToken();
  const sheetTitle = REGISTRATION_SHEET_NAME;
  await ensureSheetHeaderRow({ spreadsheetId, accessToken, sheetTitle, headers: REGISTRATION_SHEET_HEADERS, columns: 'A:F' });

  const email = values[2];
  const existingResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(`${sheetTitle}!C:C`)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (existingResponse.ok) {
    const existingData = await existingResponse.json();
    const emails = (existingData.values || []).flat();
    if (emails.includes(email)) {
      return { skipped: true, reason: 'duplicate_email' };
    }
  }

  const range = `${sheetTitle}!A:F`;
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
    throw new Error(`Failed to append registration row to Google Sheets: ${response.status} ${text}`);
  }

  return response.json();
}

async function ensureSheetHeaderRow({ spreadsheetId, accessToken, sheetTitle, headers, columns }) {
  const headerRange = `${sheetTitle}!${columns.split(':')[0]}1:${columns.split(':')[1]}1`;
  const readResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!readResponse.ok) {
    const text = await readResponse.text();
    throw new Error(`Failed to read sheet headers: ${readResponse.status} ${text}`);
  }

  const currentValues = (await readResponse.json())?.values?.[0] || [];
  if (JSON.stringify(currentValues) === JSON.stringify(headers)) {
    return;
  }

  const updateResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [headers]
      })
    }
  );

  if (!updateResponse.ok) {
    const text = await updateResponse.text();
    throw new Error(`Failed to update sheet headers: ${updateResponse.status} ${text}`);
  }
}

const CONTACT_SHEET_HEADERS = ['受付日時', '氏名', 'メールアドレス', '会社名', '電話番号', 'お問い合わせ内容', '同意'];

export async function appendContactRow(values) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_CONTACT_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_CONTACT_ID or GOOGLE_SHEETS_SPREADSHEET_ID is required.');
  }

  const accessToken = await getGoogleAccessToken();
  const sheetTitle = 'お問い合わせフォーム';
  await ensureContactHeaderRow({ spreadsheetId, accessToken, sheetTitle });
  const range = `${sheetTitle}!A:G`;
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
    throw new Error(`Failed to append contact row to Google Sheets: ${response.status} ${text}`);
  }

  return response.json();
}

async function ensureContactHeaderRow({ spreadsheetId, accessToken, sheetTitle }) {
  const headerRange = `${sheetTitle}!A1:G1`;
  const readResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!readResponse.ok) {
    const text = await readResponse.text();
    throw new Error(`Failed to read contact sheet headers: ${readResponse.status} ${text}`);
  }

  const currentValues = (await readResponse.json())?.values?.[0] || [];
  if (JSON.stringify(currentValues) === JSON.stringify(CONTACT_SHEET_HEADERS)) {
    return;
  }

  const updateResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [CONTACT_SHEET_HEADERS]
      })
    }
  );

  if (!updateResponse.ok) {
    const text = await updateResponse.text();
    throw new Error(`Failed to update contact sheet headers: ${updateResponse.status} ${text}`);
  }
}

export async function appendInboundEmailRow(values) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is required.');
  }

  const accessToken = await getGoogleAccessToken();
  const sheetTitle = await getFirstSheetTitle({ spreadsheetId, accessToken });
  await ensureHeaderRow({ spreadsheetId, accessToken, sheetTitle });
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
