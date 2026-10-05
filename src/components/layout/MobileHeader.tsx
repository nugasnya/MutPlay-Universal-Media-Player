import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../common/SearchBar';

export default function MobileHeader({ query, onQuery }: { query: string; onQuery: (v: string) => void }) {
  return <View style={styles.header}><Text style={styles.logo}>MEDIA LIBRARY</Text><SearchBar value={query} onChangeText={onQuery} /></View>;
}
const styles = StyleSheet.create({ header: { padding: 14, gap: 12, backgroundColor: '#0f0f0f' }, logo: { color: '#fff', fontWeight: '800', fontSize: 18 } });
