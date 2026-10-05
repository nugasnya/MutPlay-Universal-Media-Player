import React from 'react';
import { MediaItem } from '../../types/media';
import MediaCollection from './MediaCollection';
export default function AudioCollection(props: { items: MediaItem[]; onPress: (i: MediaItem) => void; onDelete: (i: MediaItem) => void; onImport: () => void; query: string; onQuery: (v: string) => void }) { return <MediaCollection {...props} title="Audio" emptyLabel="audio" />; }
