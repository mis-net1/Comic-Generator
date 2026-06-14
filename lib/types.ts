export type Character = {
  id: string; name: string; age: string; personality: string; physicalAppearance: string; outfit: string; dominantColors: string; signaturePose: string; accessories: string; fixedVisualRules: string; negativePrompt: string; referenceImages: string[];
};
export type StylePreset = { id: string; name: string; description: string; negativePrompt: string };
export type ReferenceImage = { id: string; name: string; type: 'character'|'style'|'pose'|'background'|'previous-panel'; url: string };
export type Panel = { id: string; chapter: string; scene: string; panelNumber: string; prompt: string; imageUrl: string; metadata: Record<string, string> };
