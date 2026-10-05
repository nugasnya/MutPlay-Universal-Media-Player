import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface ImageViewerProps {
  uri: string;
}

export default function ImageViewer({ uri }: ImageViewerProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri }} 
        style={styles.image} 
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
