# Integrity Comic Generator

Aplikasi web sederhana untuk membantu membuat prompt comic/webtoon **Integrity Squad** secara konsisten.

## Cara tes paling mudah

1. Buka web preview atau hasil deploy.
2. Klik menu **Demo** di sidebar.
3. Pilih karakter.
4. Upload gambar referensi jika ada.
5. Pilih POV, background, dan lighting.
6. Klik **Generate Prompt**.
7. Prompt final dan gambar mock akan langsung muncul.

> Untuk MVP ini, Anda tidak perlu Supabase dan tidak perlu OpenAI API key. Data demo disimpan di browser Anda memakai localStorage.

## Deploy tanpa terminal lokal: Vercel

Codex Sites tidak terdeteksi sebagai fitur yang tersedia di repository ini, jadi jalur paling mudah adalah Vercel.

1. Buka <https://vercel.com>.
2. Login dengan GitHub.
3. Klik **Add New**.
4. Klik **Project**.
5. Pilih repository **Comic-Generator**.
6. Klik **Import**.
7. Framework akan otomatis terbaca sebagai **Next.js**.
8. Jangan isi environment variable dulu; mock mode sudah aktif otomatis.
9. Klik **Deploy**.
10. Setelah selesai, klik domain preview yang diberikan Vercel.
11. Buka halaman `/demo` atau klik menu **Demo**.

## Jika nanti ingin gambar asli

Tambahkan environment variable ini di Vercel Project Settings:

```bash
OPENAI_API_KEY=isi_api_key_anda
OPENAI_IMAGE_MODEL=gpt-image-1
```

Tanpa API key, aplikasi tetap bisa dites dengan mock image placeholder.

## Jika nanti ingin database/storage

Supabase belum wajib untuk MVP. Jika sudah siap, file `supabase/schema.sql` berisi rancangan tabel awal untuk menyimpan karakter, style, referensi, panel, dan riwayat generate.
