import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // 1. Import useRouter dari expo-router

// Interface disesuaikan dengan kebutuhan property data media di projekmu
interface MediaCardProps {
  id: string;
  title: string;
  type: 'audio' | 'video' | 'image';
}

export default function MediaCard({ id, title, type }: MediaCardProps) {
  const router = useRouter(); // 2. Inisialisasi router di dalam komponen

  // 3. Fungsi navigasi imperatif yang sudah disesuaikan dengan Typed Routes projekmu
  const handlePressMedia = () => {
    let targetPath: "/media/audio-player" | "/media/video-player" | "/media/image-viewer";

    if (type === 'audio') {
      targetPath = "/media/audio-player";
    } else if (type === 'video') {
      targetPath = "/media/video-player";
    } else {
      targetPath = "/media/image-viewer"; // Menggunakan image-viewer sesuai struktur folder aslimu
    }

    // Jalankan navigasi secara imperatif dengan mengirimkan parameter data media
    router.push({
      pathname: targetPath,
      params: { id: id, title: title }
    });
  };

  return (
    // 4. Trigger navigasi saat kartu media ditekan oleh user
    <TouchableOpacity style={styles.card} onPress={handlePressMedia}>
      <View style={styles.thumbnailContainer}>
        <Text style={styles.icon}>
          {type === 'audio' ? '🎵' : type === 'video' ? '🎥' : '🖼️'}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.typeText}>{type.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnailContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  typeText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
