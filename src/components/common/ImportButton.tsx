import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function ImportButton({ label = '+ Tambah', onPress }: { label?: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.button}><Text style={styles.text}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 9 }, text: { color: '#111', fontWeight: '700' } });
