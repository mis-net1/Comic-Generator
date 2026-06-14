import type { Character, ReferenceImage, StylePreset, Panel } from './types';

export const defaultStyle: StylePreset = {
  id: 'style-webtoon-default',
  name: 'Integrity Squad Default Webtoon',
  description: 'modern Korean-Chinese webtoon, clean thin lineart, light semi-realistic anime style, soft shading, bright natural colors, Indonesian junior high school setting, realistic simple background, expressive readable faces, no text',
  negativePrompt: 'text, captions, speech bubbles, watermark, logo, distorted hands, extra fingers, inconsistent uniform, wrong age, photorealistic, 3D render'
};

export const characters: Character[] = [
  { id: 'arya', name: 'Arya', age: '13', personality: 'honest, brave, calm class leader', physicalAppearance: 'Indonesian junior high school boy, warm tan skin, short neat black hair, expressive dark eyes', outfit: 'white short-sleeve school shirt, blue tie, navy shorts, black shoes', dominantColors: 'white, navy, sky blue', signaturePose: 'standing upright with one hand over chest', accessories: 'simple black backpack and class monitor badge', fixedVisualRules: 'Always keep the same hair shape, school uniform proportions, young teen face, and readable honest expression.', negativePrompt: 'older adult face, messy uniform, different hairstyle, aggressive expression', referenceImages: [] },
  { id: 'sinta', name: 'Sinta', age: '13', personality: 'empathetic, analytical, principled', physicalAppearance: 'Indonesian junior high school girl, medium tan skin, shoulder-length black hair with side part, gentle eyes', outfit: 'white school blouse, blue tie, navy skirt, white socks, black shoes', dominantColors: 'white, navy, soft amber', signaturePose: 'holding notebook while looking attentive', accessories: 'yellow hair clip, notebook', fixedVisualRules: 'Always preserve the yellow hair clip, shoulder-length hair, and neat Indonesian school uniform.', negativePrompt: 'missing hair clip, adult proportions, glamorous makeup, inconsistent skirt color', referenceImages: [] }
];

export const styles: StylePreset[] = [defaultStyle, { id: 'golden-hour', name: 'Golden Hour Corridor', description: `${defaultStyle.description}, warm golden sunlight, long soft shadows, hopeful atmosphere`, negativePrompt: defaultStyle.negativePrompt }];
export const references: ReferenceImage[] = [
  { id: 'classroom-ref', name: 'Indonesian Classroom Moodboard', type: 'background', url: '/placeholder-reference.svg' },
  { id: 'pose-ref', name: 'Consistent Hero Pose', type: 'pose', url: '/placeholder-reference.svg' }
];
export const panels: Panel[] = [];
