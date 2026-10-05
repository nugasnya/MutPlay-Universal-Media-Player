import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MEDIA_ICONS, MEDIA_LABELS } from '../../constants/mediaTypes';
import { MediaType, Section } from '../../types/media';

export default function MobileBottomBar({ active, onSelect }: { active: Section; onSelect: (s: Section) => void }) {
  const entries: { label: string; icon: string; section: Section }[] = [{ label: 'Home', icon: '⌂', section: 'home' }, ...(['audio', 'video', 'image'] as MediaType[]).map(type => ({ label: MEDIA_LABELS[type], icon: MEDIA_ICONS[type], section: type }))];
  return <View style={styles.bar}>{entries.map(e => <Pressable key={e.section} onPress={() => onSelect(e.section)} style={styles.item}><Text style={styles.icon}>{e.icon}</Text><Text style={[styles.label, active === e.section && styles.active]}>{e.label}</Text></Pressable>)}</View>;
}
const styles = StyleSheet.create({ bar: { height: 64, flexDirection: 'row', backgroundColor: '#111', borderTopWidth: 1, borderTopColor: '#282828' }, item: { flex: 1, alignItems: 'center', justifyContent: 'center' }, icon: { fontSize: 18, color: '#fff' }, label: { color: '#aaa', fontSize: 10, marginTop: 3 }, active: { color: '#fff', fontWeight: '800' } });
