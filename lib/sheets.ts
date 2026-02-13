import Papa from 'papaparse';
import { google } from 'googleapis';
import { MenuRow } from './types';

const BOOL_TRUE = new Set(['true', '1', 'yes', 'y']);

const canonicalize = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

const parseBoolean = (value: string | boolean): boolean => {
  if (typeof value === 'boolean') return value;
  return BOOL_TRUE.has(String(value).trim().toLowerCase());
};

const parseNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeHeaders = (raw: Record<string, string>): MenuRow => {
  const normalized = new Map<string, string>();

  for (const [key, value] of Object.entries(raw)) {
    normalized.set(canonicalize(key), value);
  }

  return {
    category: normalized.get('category')?.trim() ?? '',
    subcategory: normalized.get('subcategory')?.trim() || undefined,
    item: normalized.get('item')?.trim() ?? '',
    unit: normalized.get('unit')?.trim() ?? 'lb',
    price: parseNumber(normalized.get('price') ?? 0),
    visible: parseBoolean(normalized.get('visible') ?? false),
    order: parseNumber(normalized.get('order') ?? 0)
  };
};

const normalizeRows = (rows: Record<string, string>[]): MenuRow[] => {
  return rows
    .map(normalizeHeaders)
    .filter((row) => row.visible && row.category && row.item)
    .sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      if ((a.subcategory ?? '') !== (b.subcategory ?? '')) {
        return (a.subcategory ?? '').localeCompare(b.subcategory ?? '');
      }
      return a.order - b.order;
    });
};

const getRowsFromCsv = async (url: string): Promise<MenuRow[]> => {
  const response = await fetch(url, { next: { revalidate: 30 } });
  if (!response.ok) {
    throw new Error(`CSV fetch failed: ${response.status}`);
  }

  const csv = await response.text();
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true
  });

  return normalizeRows(parsed.data);
};

const getRowsFromApi = async (): Promise<MenuRow[]> => {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const range = process.env.GOOGLE_SHEETS_RANGE ?? 'Sheet1!A:G';

  if (!sheetId || !serviceEmail || !privateKey) {
    throw new Error('Missing Google Sheets API environment variables.');
  }

  const auth = new google.auth.JWT({
    email: serviceEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range
  });

  const [header, ...body] = result.data.values ?? [];
  if (!header || body.length === 0) return [];

  const headerKeys = header.map((col) => String(col));
  const rows = body.map((values) => {
    const record: Record<string, string> = {};
    headerKeys.forEach((col, index) => {
      record[col] = String(values[index] ?? '');
    });
    return record;
  });

  return normalizeRows(rows);
};

export const getMenuRows = async (): Promise<MenuRow[]> => {
  const csvUrl = process.env.GOOGLE_SHEETS_CSV_URL;

  if (csvUrl) {
    return getRowsFromCsv(csvUrl);
  }

  return getRowsFromApi();
};
