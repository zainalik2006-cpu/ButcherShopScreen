'use client';

import { useEffect, useMemo, useState } from 'react';
import CategoryPanel from './CategoryPanel';
import { ScreenLayout } from '@/lib/types';

type MenuBoardScreenProps = {
  initial: ScreenLayout;
};

export default function MenuBoardScreen({ initial }: MenuBoardScreenProps) {
  const [layout, setLayout] = useState(initial);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/menu?screen=${layout.id}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        const json = (await response.json()) as { layout: ScreenLayout };
        setLayout(json.layout);
        setOffline(false);
      } catch {
        setOffline(true);
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [layout.id]);

  const leftPrimary = useMemo(
    () => (layout.id === 1 ? layout.leftBlocks.slice(0, 2) : layout.leftBlocks),
    [layout]
  );
  const leftSecondary = useMemo(
    () => (layout.id === 1 ? layout.leftBlocks.slice(2) : []),
    [layout]
  );

  return (
    <main className="h-screen w-screen overflow-hidden bg-board p-4 text-white">
      <header className="mb-4 flex items-center justify-between rounded-md border border-white/30 bg-black/40 px-4 py-3">
        <div>
          <h1 className="text-[2vw] font-black uppercase tracking-wider text-brand.gold">Halal 4 All</h1>
          <p className="text-[1vw] text-white/90">halal4all.com • (555) 123-4567</p>
        </div>
        <div className="text-right text-[0.95vw] text-white/90">
          <p>Live Meat Price Menu</p>
          <p>Last updated: {layout.lastUpdated}</p>
          {offline && <p className="font-semibold text-amber-300">Offline / cached prices</p>}
        </div>
      </header>

      <div className="grid h-[calc(100vh-8.5rem)] gap-4" style={{ gridTemplateColumns: layout.id === 1 ? '2fr 1fr' : '1fr 1fr' }}>
        <section className="grid gap-4" style={{ gridTemplateRows: layout.id === 1 ? 'auto auto' : '1fr' }}>
          <div className="grid gap-4" style={{ gridTemplateColumns: layout.id === 1 ? '1fr 1fr' : 'repeat(3, 1fr)' }}>
            {leftPrimary.map((block) => (
              <CategoryPanel key={`${block.title}-${block.subtitle ?? 'all'}`} block={block} />
            ))}
          </div>
          {leftSecondary.length > 0 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <CategoryPanel block={leftSecondary[0]} />
              <div className="rounded-md border border-white/20 bg-black/20 p-3">
                <p className="mb-2 text-[1.1vw] font-bold uppercase text-brand.gold">Fresh Cuts Daily</p>
                <div className="h-[80%] rounded bg-[url('/meat-placeholder.svg')] bg-cover bg-center" />
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-4" style={{ gridTemplateRows: `repeat(${layout.rightBlocks.length}, minmax(0, 1fr))` }}>
          {layout.rightBlocks.map((block) => (
            <CategoryPanel key={`${block.title}-${block.subtitle ?? 'all'}`} block={block} compact />
          ))}
        </section>
      </div>
    </main>
  );
}
