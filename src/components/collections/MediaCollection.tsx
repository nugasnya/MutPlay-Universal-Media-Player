import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MediaItem } from '../../types/media';
import SearchBar from '../common/SearchBar';
import ImportButton from '../common/ImportButton';
import MediaCard from '../cards/MediaCard';
import EmptyCollection from './EmptyCollection';

export default function MediaCollection({ title, emptyLabel, items, onPress, onDelete, onImport, query, onQuery }: { title: string; emptyLabel: string; items: MediaItem[]; onPress: (i: MediaItem) => void; onDelete: (i: MediaItem) => void; onImport: () => void; query: string; onQuery: (v: string) => void }) {
  return <ScrollView contentContainerStyle={styles.container}><View style={styles.header}><View><Text style={styles.title}>{title}</Text><Text style={styles.count}>{items.length} file</Text></View><ImportButton label={`+ Tambah ${title}`} onPress={onImport} /></View><SearchBar value={query} onChangeText={onQuery} />{!items.length ? <EmptyCollection label={emptyLabel} /> : <View style={styles.grid}>{items.map(item => <MediaCard key={item.id} item={item} onPress={() => onPress(item)} onDelete={() => onDelete(item)} />)}</View>}</ScrollView>;
}
const styles = StyleSheet.create({ container: { padding: 20 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }, title: { color: '#fff', fontSize: 25, fontWeight: '800' }, count: { color: '#888', marginTop: 4 }, grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 18 } });
