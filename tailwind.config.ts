import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#080b12', panel: '#111827', card: '#172033', accent: '#f59e0b' } } }, plugins: [] };
export default config;
