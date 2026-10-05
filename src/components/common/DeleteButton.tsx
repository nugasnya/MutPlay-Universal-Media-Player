import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function DeleteButton({ onPress }: { onPress: () => void }) {
  return <Pressable onPress={onPress} style={styles.button}><Text style={styles.text}>Hapus</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { backgroundColor: '#2a2a2a', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 6 }, text: { color: '#fff', fontSize: 11 } });
