import ItemRow from './ItemRow';
import { CategoryBlock } from '@/lib/types';

type CategoryPanelProps = {
  block: CategoryBlock;
  compact?: boolean;
};

export default function CategoryPanel({ block, compact }: CategoryPanelProps) {
  return (
    <section className="rounded-md border border-white/20 bg-black/30 p-3 shadow-panel">
      <h2 className="text-[1.4vw] font-extrabold uppercase tracking-wide text-brand.gold">{block.title}</h2>
      {block.subtitle ? (
        <p className="mb-2 text-[1.05vw] font-semibold uppercase text-emerald-200">{block.subtitle}</p>
      ) : (
        <div className="mb-2" />
      )}
      <div className={compact ? 'space-y-0' : 'space-y-1'}>
        {block.rows.map((row) => (
          <ItemRow key={`${row.category}-${row.subcategory}-${row.item}`} row={row} />
        ))}
        {block.rows.length === 0 && <p className="py-2 text-[1vw] text-white/50">No visible items.</p>}
      </div>
    </section>
  );
}
