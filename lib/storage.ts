import type { Character, Panel, ReferenceImage, StylePreset } from './types';
import { characters, panels, references, styles } from './seed-data';

type StoreShape = {
  characters: Character[];
  styles: StylePreset[];
  references: ReferenceImage[];
  panels: Panel[];
};

export const storageKey = 'integrity-comic-generator-mvp';
export const defaultStore: StoreShape = { characters, styles, references, panels };

export function loadStore(): StoreShape {
  if (typeof window === 'undefined') return defaultStore;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return defaultStore;
  try {
    return { ...defaultStore, ...JSON.parse(raw) } as StoreShape;
  } catch {
    return defaultStore;
  }
}

export function saveStore(store: StoreShape) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey, JSON.stringify(store));
}

export function resetStore() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(storageKey);
}
