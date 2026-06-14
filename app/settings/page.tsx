import { Shell } from '@/components/Shell';

export default function Settings() {
  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm font-bold text-amber-400">Production Settings</p>
        <h2 className="text-3xl font-black">Settings</h2>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="card">
          <h3 className="text-xl font-bold">Mock mode default</h3>
          <p className="mt-3 text-sm text-slate-300">
            Aplikasi bisa dites langsung. Jika OPENAI_API_KEY belum diisi, generator menampilkan mock image placeholder.
          </p>
        </section>
        <section className="card">
          <h3 className="text-xl font-bold">Database optional</h3>
          <p className="mt-3 text-sm text-slate-300">
            MVP memakai localStorage di browser. Supabase schema tetap tersedia untuk tahap produksi berikutnya.
          </p>
        </section>
      </div>
    </Shell>
  );
}
