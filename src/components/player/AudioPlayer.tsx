import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { formatDuration } from '../../utils/formatDuration';

interface AudioPlayerProps {
  uri: string;
  name: string;
}

export default function AudioPlayer({ uri, name }: AudioPlayerProps) {
  const player = useAudioPlayer(uri, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);

  const duration = status.duration || 0;
  const current = status.currentTime || 0;

  // Menghitung persentase bar progres audio
  const progressWidth = duration ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Visual & Informasi Lagu */}
      <Text style={styles.icon}>🎵</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.time}>
        {formatDuration(current)} / {formatDuration(duration)}
      </Text>

      {/* Progress Bar Track */}
      <View style={styles.track}>
        <View style={[styles.progress, { width: `${progressWidth}%` }]} />
      </View>

      {/* Kontrol Pemutar Audio */}
      <View style={styles.controls}>
        {/* Tombol Mundur 10 Detik */}
        <Pressable
          onPress={() => player.seekTo(Math.max(0, current - 10))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>−10</Text>
        </Pressable>

        {/* Tombol Play / Pause */}
        <Pressable
          onPress={() => (status.playing ? player.pause() : player.play())}
          style={styles.play}
        >
          <Text style={styles.playText}>{status.playing ? 'Pause' : 'Play'}</Text>
        </Pressable>

        {/* Tombol Maju 10 Detik */}
        <Pressable
          onPress={() => player.seekTo(Math.min(duration, current + 10))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+10</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 700,
    padding: 30,
  },
  icon: {
    fontSize: 80,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
  },
  time: {
    color: '#aaa',
    marginTop: 20,
  },
  track: {
    width: '100%',
    height: 5,
    backgroundColor: '#333',
    marginTop: 12,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#fff',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 25,
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
  play: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  playText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
