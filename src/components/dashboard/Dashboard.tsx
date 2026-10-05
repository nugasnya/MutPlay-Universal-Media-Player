import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MediaItem, MediaType } from '../../types/media';
import CollectionSummary from './CollectionSummary';
import RecentMedia from './RecentMedia';

export default function Dashboard({ media, counts, onSection, onMedia, onDelete }: { media: MediaItem[]; counts: Record<MediaType, number>; onSection: (s: MediaType) => void; onMedia: (item: MediaItem) => void; onDelete: (item: MediaItem) => void }) {
  return <ScrollView contentContainerStyle={styles.container}><Text style={styles.title}>Selamat datang di Media Library</Text><Text style={styles.subtitle}>Kelola audio, video, dan gambar dalam satu tempat.</Text><View style={styles.row}>{(['audio', 'video', 'image'] as MediaType[]).map(type => <CollectionSummary key={type} type={type} count={counts[type]} onPress={() => onSection(type)} />)}</View><RecentMedia items={media} onPress={onMedia} onDelete={onDelete} /></ScrollView>;
}
const styles = StyleSheet.create({ container: { padding: 22 }, title: { color: '#fff', fontSize: 25, fontWeight: '800' }, subtitle: { color: '#999', marginTop: 6 }, row: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5, marginTop: 22 } });
