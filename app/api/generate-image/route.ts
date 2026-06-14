import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const prompt = String(body.prompt || '');
  if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      mode: 'mock',
      imageUrl: '/mock-panel.svg',
      metadata: { prompt, note: 'OPENAI_API_KEY is not configured; returned mock panel.' }
    });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const image = await openai.images.generate({ model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1', prompt, size: '1024x1536' });
  const base64 = image.data?.[0]?.b64_json;
  if (!base64) return NextResponse.json({ error: 'OpenAI did not return image data' }, { status: 502 });

  const buffer = Buffer.from(base64, 'base64');
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ mode: 'openai-no-storage', imageUrl: `data:image/png;base64,${base64}`, metadata: { prompt } });
  }

  const path = `generated/${Date.now()}-panel.png`;
  const upload = await supabase.storage.from(process.env.SUPABASE_IMAGE_BUCKET || 'comic-panels').upload(path, buffer, { contentType: 'image/png', upsert: true });
  if (upload.error) return NextResponse.json({ error: upload.error.message }, { status: 500 });
  const { data } = supabase.storage.from(process.env.SUPABASE_IMAGE_BUCKET || 'comic-panels').getPublicUrl(path);
  await supabase.from('generation_history').insert({ prompt, image_url: data.publicUrl, metadata: body });
  return NextResponse.json({ mode: 'openai-supabase', imageUrl: data.publicUrl, metadata: { prompt } });
}
