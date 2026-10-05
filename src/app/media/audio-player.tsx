import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useMedia } from '../../context/MediaContext';
import { getMediaById } from '../../utils/mediaHelpers';
import AudioPlayer from '../../components/player/AudioPlayer';

export default function AudioPlayerPage() { const { id } = useLocalSearchParams<{ id: string }>(); const { media } = useMedia(); const item = getMediaById(media, id); if (!item) return <View style={styles.center}><Text style={styles.text}>Audio tidak ditemukan.</Text></View>; return <View style={styles.page}><Stack.Screen options={{ title: item.name, headerShown: true, headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff', headerLeft: () => null }} /><AudioPlayer uri={item.uri} name={item.name} /><Text onPress={() => router.back()} style={styles.back}>← Kembali</Text></View>; }
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#0f0f0f', alignItems: 'center', justifyContent: 'center' }, center: { flex: 1, backgroundColor: '#0f0f0f', alignItems: 'center', justifyContent: 'center' }, text: { color: '#fff' }, back: { color: '#fff', marginBottom: 30 } });
