# Media Library - Struktur Lengkap

React Native + Expo Router + TypeScript.

## Install

```bash
npx expo install expo-document-picker expo-video expo-audio expo-file-system @react-native-async-storage/async-storage
```

## Jalankan

```bash
npx expo start -c
```

## Struktur

- app/: routing Expo Router
- components/: UI layout, dashboard, collection, card, player, common
- context/: state dan persistence metadata
- hooks/: controller, search, responsive
- utils/: helper media, ukuran file, durasi
- constants/: label dan icon media
- types/: TypeScript types
- assets/: tempat icon/gambar tambahan

Catatan: persistence file native memakai folder document aplikasi. Untuk web, URI picker browser tidak sama dengan penyimpanan file permanen; jika ingin persistence web yang benar-benar kuat, gunakan IndexedDB/Blob storage.
