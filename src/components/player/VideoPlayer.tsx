import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

interface VideoPlayerProps {
  uri: string;
}

export default function VideoPlayer({ uri }: VideoPlayerProps) {
  const { width } = useWindowDimensions();

  // Inisialisasi video player dari expo-video
  const player = useVideoPlayer(uri, (p) => {
    p.loop = false;
  });

  // Menghitung lebar dan tinggi (rasio 16:9) agar responsif
  const videoWidth = Math.min(width - 32, 1000);
  const videoHeight = (videoWidth * 9) / 16;

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={{ width: videoWidth, height: videoHeight }}
        nativeControls
        contentFit="contain"
        fullscreenOptions={{ enable: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
