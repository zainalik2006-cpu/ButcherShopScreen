# Halal 4 All — Live Meat Price TV Menu

Production-ready Next.js digital signage app for two TVs (`/screen/1` and `/screen/2`) using **Google Sheets as the single source of truth**.

## Tech stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Deployable on Vercel
- No database

## Sheet columns expected

The app normalizes headers, so extra spaces and minor casing differences are okay:

- Category
- Subcategory (optional)
- Item
- Unit
- Price
- Visible
- Order

Rules implemented:
- Only `Visible = true`
- Sort by Category → Subcategory → Order
- Price format `$6.99`
- Unit format `/lb`, `/ea`, `/box`, etc.

## Google Sheets integration

## Option A (simple): Published CSV

1. In Google Sheets: **File → Share → Publish to web**.
2. Publish the tab as CSV and copy the URL.
3. Set env var:

```bash
GOOGLE_SHEETS_CSV_URL="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
```

## Option B (recommended): Sheets API + Service Account

1. Create service account in Google Cloud.
2. Enable Google Sheets API.
3. Share your sheet with the service account email.
4. Set env vars:

```bash
GOOGLE_SHEETS_ID="your_spreadsheet_id"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
# Optional if your tab/range is custom:
GOOGLE_SHEETS_RANGE="Sheet1!A:G"
```

## Local development

```bash
npm install
npm run dev
```

Open:
- http://localhost:3000/screen/1
- http://localhost:3000/screen/2

## Deploy on Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add env vars (CSV option OR API option).
4. Deploy.

For TV usage:
- TV #1: open `/screen/1`
- TV #2: open `/screen/2`

## Live updates

- Server fetch revalidates every 30s.
- Client polls every 45s as a safety update.
- If polling fails, current board remains visible and an `Offline / cached prices` indicator appears.
