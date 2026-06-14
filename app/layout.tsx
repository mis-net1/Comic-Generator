import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Integrity Comic Generator', description: 'Consistent webtoon panel generation tool for Integrity Squad.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
