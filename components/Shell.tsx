import Link from 'next/link';
const nav = ['Demo','Characters','Styles','References','Panel Generator','Gallery','Settings'];
const hrefs: Record<string,string> = { Demo: '/demo', Characters: '/characters', Styles: '/styles', References: '/references', 'Panel Generator': '/generator', Gallery: '/gallery', Settings: '/settings' };
export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen lg:flex"><aside className="border-r border-slate-800 bg-slate-950/80 p-6 lg:w-72"><Link href="/" className="block"><p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Integrity Squad</p><h1 className="mt-2 text-2xl font-black">Integrity Comic Generator</h1></Link><nav className="mt-10 space-y-2">{nav.map((n)=><Link key={n} href={hrefs[n]} className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white">{n}</Link>)}</nav><p className="mt-10 text-xs leading-5 text-slate-500">Production MVP for consistent Indonesian school comic panels with reusable characters, styles, references, prompts, and revision modes.</p></aside><main className="flex-1 p-5 lg:p-8">{children}</main></div>;
}
