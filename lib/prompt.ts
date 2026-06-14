import type { Character, ReferenceImage, StylePreset } from './types';

export type PanelForm = {
  chapter: string; scene: string; panelNumber: string; shotType: string; cameraAngle: string; pov: string; expression: string; action: string; background: string; lighting: string; mood: string; aspectRatio: string; additionalPrompt: string; negativePrompt: string;
};

export const promptTemplates = [
  'close-up emotional face', 'OTS classroom shot', 'wide classroom exam scene', 'cinematic low angle', 'high angle classroom', 'corridor golden hour', 'Indonesian classroom background'
];

export const revisionModes = [
  'keep character, change background', 'keep background, change character pose', 'keep composition, change expression', 'keep style 100%, revise only selected detail', 'make image closer to reference', 'remove text', 'improve hand anatomy', 'fix school uniform'
];

export function buildPrompt(form: PanelForm, style: StylePreset, characters: Character[], refs: ReferenceImage[] = []) {
  const characterBlock = characters.map((c) => `${c.name}, age ${c.age}: personality ${c.personality}; appearance ${c.physicalAppearance}; outfit ${c.outfit}; dominant colors ${c.dominantColors}; signature pose ${c.signaturePose}; accessories ${c.accessories}; fixed visual rules: ${c.fixedVisualRules}.`).join('\n');
  const referenceBlock = refs.length ? `Reference images to respect: ${refs.map((r) => `${r.type} reference named ${r.name}`).join(', ')}.` : 'No external references selected.';
  const negative = [style.negativePrompt, ...characters.map((c) => c.negativePrompt), form.negativePrompt].filter(Boolean).join(', ');
  return `Create one consistent comic/webtoon panel in English.\n\nStyle preset: ${style.description}.\n\nCharacters:\n${characterBlock}\n\nPanel direction: Chapter ${form.chapter}, Scene ${form.scene}, Panel ${form.panelNumber}. Shot type: ${form.shotType}. Camera angle: ${form.cameraAngle}. POV: ${form.pov}. Expression: ${form.expression}. Action: ${form.action}. Background: ${form.background}. Lighting: ${form.lighting}. Mood: ${form.mood}. Aspect ratio: ${form.aspectRatio}. Additional direction: ${form.additionalPrompt}.\n\n${referenceBlock}\n\nContinuity requirements: keep character designs, style, POV, background logic, and lighting consistent with selected references and prior panels. No text in the image.\n\nNegative prompt: ${negative}.`;
}
