import { formatPrice, formatUnit } from '@/lib/menu';
import { MenuRow } from '@/lib/types';

type ItemRowProps = {
  row: MenuRow;
};

export default function ItemRow({ row }: ItemRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-1 text-[1.2vw] leading-tight">
      <span className="truncate text-white">{row.item}</span>
      <span className="shrink-0 font-semibold text-brand.gold">
        {formatPrice(row.price)}
        <span className="ml-1 text-[0.85em] text-white/90">{formatUnit(row.unit)}</span>
      </span>
    </div>
  );
}
