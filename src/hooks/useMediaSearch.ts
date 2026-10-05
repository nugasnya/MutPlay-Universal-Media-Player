import { useMemo, useState } from 'react';
import { searchMedia } from '../utils/mediaHelpers';
import { MediaItem } from '../types/media';

export function useMediaSearch(items: MediaItem[]) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchMedia(items, query), [items, query]);
  return { query, setQuery, results };
}
