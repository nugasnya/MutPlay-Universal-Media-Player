import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useMedia } from '../../context/MediaContext';
import { getMediaById } from '../../utils/mediaHelpers';
import ImageViewer from '../../components/player/ImageViewer';

export default function ImageViewerPage() { const { id } = useLocalSearchParams<{ id: string }>(); const { media } = useMedia(); const item = getMediaById(media, id); if (!item) return <View style={styles.center}><Text style={styles.text}>Gambar tidak ditemukan.</Text></View>; return <View style={styles.page}><Stack.Screen options={{ title: item.name, headerShown: true, headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff' }} /><ImageViewer uri={item.uri} /><Text onPress={() => router.back()} style={styles.back}>← Kembali</Text></View>; }
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#000' }, center: { flex: 1, backgroundColor: '#0f0f0f', alignItems: 'center', justifyContent: 'center' }, text: { color: '#fff' }, back: { color: '#fff', textAlign: 'center', padding: 16 } });
