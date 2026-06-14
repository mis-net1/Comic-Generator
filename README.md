# Integrity Comic Generator

A Next.js, TypeScript, Tailwind CSS MVP for generating consistent comic/webtoon panels for the Indonesian school comic project **Integrity Squad**.

## Features

- Dark responsive dashboard with sidebar navigation.
- Character library and style preset CRUD workspaces seeded with Integrity Squad examples.
- Panel Generator that merges selected style presets, character continuity rules, panel direction, reference metadata, and negative prompts into one final English prompt.
- Reference image categories for character, style, pose, background, and previous panel continuity.
- OpenAI image generation API route using `OPENAI_API_KEY`, with a mock SVG fallback when the key is unavailable.
- Supabase-ready database schema and storage upload path for generated panel metadata.
- Revision mode shortcuts and reusable prompt templates.
- Gallery workspace for chapter/scene/panel grouping.

## Environment

```bash
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-1
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_IMAGE_BUCKET=comic-panels
```

Run the SQL in `supabase/schema.sql` to create the MVP tables.
