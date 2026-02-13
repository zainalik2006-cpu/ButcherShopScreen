import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8 text-white">
      <div className="w-full max-w-xl rounded-lg border border-white/20 bg-slate-900 p-8 text-center">
        <h1 className="mb-3 text-3xl font-bold">Halal 4 All TV Menu</h1>
        <p className="mb-8 text-white/75">Choose a display for each TV.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link className="rounded bg-emerald-700 px-4 py-3 font-semibold hover:bg-emerald-600" href="/screen/1">
            Open Screen 1
          </Link>
          <Link className="rounded bg-rose-700 px-4 py-3 font-semibold hover:bg-rose-600" href="/screen/2">
            Open Screen 2
          </Link>
        </div>
      </div>
    </main>
  );
}
