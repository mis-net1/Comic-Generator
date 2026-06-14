import Link from 'next/link';
import { Shell } from '@/components/Shell';

export default function Home() {
  return (
    <Shell>
      <section className="grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <div className="card">
          <p className="text-sm font-bold text-amber-400">MVP Dashboard</p>
          <h2 className="mt-3 text-4xl font-black">Generate consistent Integrity Squad comic panels.</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Mulai dari halaman Demo untuk mencoba prompt generator langsung di browser tanpa terminal,
            tanpa Supabase, dan tanpa OpenAI API key.
          </p>
          <Link className="btn mt-8 inline-block" href="/demo">Open Browser Demo</Link>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold">MVP mode</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>• Mock image aktif otomatis</li>
            <li>• Data demo tersimpan di localStorage</li>
            <li>• API key OpenAI opsional</li>
            <li>• Supabase disiapkan untuk tahap berikutnya</li>
          </ul>
        </div>
      </section>
    </Shell>
  );
}
