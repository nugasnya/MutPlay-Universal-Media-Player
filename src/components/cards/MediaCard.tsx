import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MEDIA_ICONS } from '../../constants/mediaTypes';
import { MediaItem } from '../../types/media';
import { formatFileSize } from '../../utils/formatFileSize';
import DeleteButton from '../common/DeleteButton';

export default function MediaCard({ item, onPress, onDelete }: { item: MediaItem; onPress: () => void; onDelete: () => void }) {
  return <View style={styles.wrapper}><Pressable onPress={onPress} style={styles.card}>{item.type === 'image' ? <Image source={{ uri: item.uri }} style={styles.preview} resizeMode="cover" /> : <View style={styles.preview}><Text style={styles.icon}>{MEDIA_ICONS[item.type]}</Text></View>}<Text numberOfLines={1} style={styles.name}>{item.name}</Text><Text style={styles.meta}>{formatFileSize(item.size)}</Text></Pressable><DeleteButton onPress={onDelete} /></View>;
}
const styles = StyleSheet.create({ wrapper: { width: 180, marginRight: 12, marginBottom: 16 }, card: { backgroundColor: '#191919', borderRadius: 8, overflow: 'hidden' }, preview: { width: '100%', height: 105, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center' }, icon: { fontSize: 34 }, name: { color: '#fff', fontWeight: '700', paddingHorizontal: 10, paddingTop: 9 }, meta: { color: '#888', fontSize: 11, padding: 10 } });
