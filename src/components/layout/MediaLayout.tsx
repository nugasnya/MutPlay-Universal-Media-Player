import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Section, MediaType } from '../../types/media';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import MobileBottomBar from './MobileBottomBar';
import { useResponsive } from '../../hooks/useResponsive';

export default function MediaLayout({ active, onSelect, onImport, query, onQuery, children }: { active: Section; onSelect: (s: Section) => void; onImport: (t: MediaType) => void; query: string; onQuery: (v: string) => void; children: React.ReactNode }) {
  const { isDesktop } = useResponsive();
  if (isDesktop) return <View style={styles.desktop}><Sidebar active={active} onSelect={onSelect} onImport={onImport} /><View style={styles.content}>{children}</View></View>;
  return <View style={styles.mobile}><MobileHeader query={query} onQuery={onQuery} /><View style={styles.content}>{children}</View><MobileBottomBar active={active} onSelect={onSelect} /></View>;
}
const styles = StyleSheet.create({ desktop: { flex: 1, flexDirection: 'row', backgroundColor: '#0f0f0f' }, mobile: { flex: 1, backgroundColor: '#0f0f0f' }, content: { flex: 1 } });
