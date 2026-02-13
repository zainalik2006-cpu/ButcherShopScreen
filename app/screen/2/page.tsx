import MenuBoardScreen from '@/components/MenuBoardScreen';
import { buildScreenTwo } from '@/lib/menu';
import { getMenuRows } from '@/lib/sheets';

export const revalidate = 30;
export const dynamic = 'force-dynamic';

export default async function ScreenTwoPage() {
  const rows = await getMenuRows();
  const lastUpdated = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());

  return <MenuBoardScreen initial={buildScreenTwo(rows, lastUpdated)} />;
}
