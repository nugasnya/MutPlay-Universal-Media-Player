import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MediaItem } from '../../types/media';
import MediaCard from '../cards/MediaCard';

export default function RecentMedia({ items, onPress, onDelete }: { items: MediaItem[]; onPress: (item: MediaItem) => void; onDelete: (item: MediaItem) => void }) {
  if (!items.length) return null;
  return <View><Text style={styles.title}>Media Terbaru</Text><View style={styles.grid}>{items.slice(0, 6).map(item => <MediaCard key={item.id} item={item} onPress={() => onPress(item)} onDelete={() => onDelete(item)} />)}</View></View>;
}
const styles = StyleSheet.create({ title: { color: '#fff', fontSize: 18, fontWeight: '800', marginVertical: 15 }, grid: { flexDirection: 'row', flexWrap: 'wrap' } });
