import React from 'react';
import MediaCard from './MediaCard';
import { MediaItem } from '../../types/media';
export default function VideoCard(props: { item: MediaItem; onPress: () => void; onDelete: () => void }) { return <MediaCard {...props} />; }
