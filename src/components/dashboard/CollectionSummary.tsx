import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MEDIA_ICONS, MEDIA_LABELS } from '../../constants/mediaTypes';
import { MediaType } from '../../types/media';

export default function CollectionSummary({ type, count, onPress }: { type: MediaType; count: number; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.card}><Text style={styles.icon}>{MEDIA_ICONS[type]}</Text><Text style={styles.name}>{MEDIA_LABELS[type]}</Text><Text style={styles.count}>{count} file</Text></Pressable>;
}
const styles = StyleSheet.create({ card: { flex: 1, minWidth: 150, backgroundColor: '#191919', borderRadius: 10, padding: 20, margin: 5 }, icon: { fontSize: 30 }, name: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 12 }, count: { color: '#888', marginTop: 5 } });
