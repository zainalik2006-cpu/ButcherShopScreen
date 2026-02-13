import { NextRequest, NextResponse } from 'next/server';
import { buildScreenOne, buildScreenTwo } from '@/lib/menu';
import { getMenuRows } from '@/lib/sheets';

export const revalidate = 30;
export const dynamic = 'force-dynamic';

const formatUpdatedTime = (): string =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());

export async function GET(request: NextRequest) {
  const screen = request.nextUrl.searchParams.get('screen') === '2' ? 2 : 1;

  const rows = await getMenuRows();
  const lastUpdated = formatUpdatedTime();
  const layout = screen === 1 ? buildScreenOne(rows, lastUpdated) : buildScreenTwo(rows, lastUpdated);

  return NextResponse.json({ layout });
}
