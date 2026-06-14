'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { Shell } from '@/components/Shell';
import { buildPrompt, type PanelForm } from '@/lib/prompt';
import { loadStore, saveStore } from '@/lib/storage';
import { defaultStyle } from '@/lib/seed-data';
import type { ReferenceImage } from '@/lib/types';

const initialForm: PanelForm = {
  chapter: 'Demo',
  scene: 'Integrity test in class',
  panelNumber: '1',
  shotType: 'medium shot',
  cameraAngle: 'eye level',
  pov: 'third-person observer',
  expression: 'honest, focused, slightly nervous',
  action: 'The selected student chooses honesty during a classroom test.',
  background: 'Indonesian junior high school classroom',
  lighting: 'bright natural morning light',
  mood: 'hopeful and sincere',
  aspectRatio: '9:16 vertical webtoon',
  additionalPrompt: 'Make the panel clean and easy to understand for students.',
  negativePrompt: 'text, speech bubble, watermark, extra fingers, distorted hands'
};

const povOptions = ['third-person observer', 'over-the-shoulder POV', 'student eye-level POV', 'teacher desk POV'];
const backgroundOptions = ['Indonesian junior high school classroom', 'school corridor', 'library corner', 'school courtyard'];
const lightingOptions = ['bright natural morning light', 'soft golden hour light', 'indoor fluorescent classroom light', 'dramatic window light'];

export default function DemoPage() {
  const [store, setStore] = useState(() => loadStore());
  const [form, setForm] = useState(initialForm);
  const [characterId, setCharacterId] = useState(store.characters[0]?.id || '');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [mockImage, setMockImage] = useState('');

  const selectedCharacter = useMemo(
    () => store.characters.find((character) => character.id === characterId),
    [characterId, store.characters]
  );

  async function handleReferenceUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const uploaded = await Promise.all(
      files.map(
        (file) =>
          new Promise<ReferenceImage>((resolve) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                id: `${Date.now()}-${file.name}`,
                name: file.name,
                type: 'character',
                url: String(reader.result)
              });
            reader.readAsDataURL(file);
          })
      )
    );
    const nextStore = { ...store, references: [...uploaded, ...store.references] };
    setStore(nextStore);
    saveStore(nextStore);
  }

  function generatePrompt() {
    const prompt = buildPrompt(
      form,
      defaultStyle,
      selectedCharacter ? [selectedCharacter] : [],
      store.references
    );
    setGeneratedPrompt(prompt);
    setMockImage('/mock-panel.svg');

    const nextStore = {
      ...store,
      panels: [
        {
          id: `${Date.now()}`,
          chapter: form.chapter,
          scene: form.scene,
          panelNumber: form.panelNumber,
          prompt,
          imageUrl: '/mock-panel.svg',
          metadata: { mode: 'browser demo localStorage' }
        },
        ...store.panels
      ]
    };
    setStore(nextStore);
    saveStore(nextStore);
  }

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-sm font-bold text-amber-400">Browser Demo</p>
        <h2 className="text-3xl font-black">Tes langsung tanpa API key</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Pilih karakter, upload referensi, pilih POV, background, dan lighting, lalu klik Generate Prompt.
          Data demo tersimpan di localStorage browser Anda.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="card space-y-4">
          <div>
            <label>Pilih karakter</label>
            <select value={characterId} onChange={(event) => setCharacterId(event.target.value)}>
              {store.characters.map((character) => (
                <option key={character.id} value={character.id}>{character.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Upload referensi</label>
            <input type="file" multiple accept="image/*" onChange={handleReferenceUpload} />
            <p className="mt-2 text-xs text-slate-400">{store.references.length} referensi tersedia di browser ini.</p>
          </div>

          <div>
            <label>Pilih POV</label>
            <select value={form.pov} onChange={(event) => setForm({ ...form, pov: event.target.value })}>
              {povOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <label>Pilih background</label>
            <select value={form.background} onChange={(event) => setForm({ ...form, background: event.target.value })}>
              {backgroundOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <label>Pilih lighting</label>
            <select value={form.lighting} onChange={(event) => setForm({ ...form, lighting: event.target.value })}>
              {lightingOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <button className="btn w-full" onClick={generatePrompt}>Generate Prompt</button>
        </section>

        <section className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold">Hasil prompt final</h3>
            <pre className="mt-4 min-h-72 whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-xs text-slate-300">
              {generatedPrompt || 'Prompt akan muncul di sini setelah Anda klik Generate Prompt.'}
            </pre>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold">Mock image placeholder</h3>
            {mockImage ? (
              <img src={mockImage} alt="Mock generated panel" className="mt-4 max-h-[520px] rounded-xl border border-slate-700" />
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-700 p-10 text-center text-sm text-slate-400">
                Gambar mock akan muncul setelah Generate Prompt.
              </div>
            )}
          </div>
        </section>
      </div>
    </Shell>
  );
}
