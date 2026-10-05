import { MediaItem, MediaType } from '../types/media';

export function filterByType(items: MediaItem[], type: MediaType) {
  return items.filter(item => item.type === type);
}

export function searchMedia(items: MediaItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(item => item.name.toLowerCase().includes(q));
}

export function getMediaById(items: MediaItem[], id?: string) {
  return items.find(item => item.id === id);
}
