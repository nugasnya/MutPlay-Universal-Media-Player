import React from 'react'; // BACA: Tambahkan baris ini untuk menghilangkan error UMD global
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function UnmatchedRouteScreen() {
  return (
    <>
      {/* Mengatur judul header untuk halaman yang tidak ditemukan */}
      <Stack.Screen options={{ title: 'Halaman Tidak Ditemukan' }} />
      
      <View style={styles.container}>
        <Text style={styles.emoji}>🔍</Text>
        <Text style={styles.title}>Waduh! Halaman Tidak Ada</Text>
        <Text style={styles.message}>
          Rute atau halaman yang kamu cari tidak ditemukan atau telah dipindahkan.
        </Text>
        
        {/* Tombol kembali ke halaman utama (Index Page) */}
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Kembali ke Beranda</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
