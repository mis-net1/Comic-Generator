import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const prompt = String(body.prompt || '');

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      mode: 'mock',
      imageUrl: '/mock-panel.svg',
      metadata: {
        prompt,
        note: 'Demo mock mode is active. Add OPENAI_API_KEY later to enable real image generation.'
      }
    });
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
      prompt,
      size: '1024x1536'
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: response.status });
  }

  const image = await response.json();
  const base64 = image.data?.[0]?.b64_json;

  if (!base64) {
    return NextResponse.json({ error: 'OpenAI did not return image data' }, { status: 502 });
  }

  return NextResponse.json({
    mode: 'openai',
    imageUrl: `data:image/png;base64,${base64}`,
    metadata: { prompt }
  });
}
