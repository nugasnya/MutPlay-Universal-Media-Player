import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  MediaItem,
  MediaType,
} from "../types/media";

const STORAGE_KEY = "@media_library_metadata_v4";

// =====================================================
// BATAS UKURAN FILE
// =====================================================

const MAX_FILE_SIZE = {
  image: 20 * 1024 * 1024,   // 20 MB
  audio: 100 * 1024 * 1024,  // 100 MB
  video: 500 * 1024 * 1024,  // 500 MB
};

const MAX_FILE_SIZE_LABEL = {
  image: "20 MB",
  audio: "100 MB",
  video: "500 MB",
};

// =====================================================
// CONTEXT TYPE
// =====================================================

type MediaContextType = {
  media: MediaItem[];
  audios: MediaItem[];
  videos: MediaItem[];
  images: MediaItem[];

  isLoading: boolean;
  isImporting: boolean;
  error: string | null;

  importMedia: (
    type: MediaType
  ) => Promise<void>;

  pickAudio: () => Promise<void>;
  pickVideo: () => Promise<void>;
  pickImage: () => Promise<void>;

  removeMedia: (
    id: string
  ) => Promise<void>;
};

// =====================================================
// CONTEXT
// =====================================================

const MediaContext = createContext<
  MediaContextType | undefined
>(undefined);

// =====================================================
// PROVIDER
// =====================================================

export function MediaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [media, setMedia] =
    useState<MediaItem[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isImporting, setIsImporting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  // ===================================================
  // LOAD MEDIA
  // ===================================================

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setIsLoading(true);

      if (Platform.OS === "web") {
        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (saved) {
          setMedia(
            JSON.parse(saved)
          );
        }

        return;
      }

      const saved =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        setMedia(
          JSON.parse(saved)
        );
      }
    } catch (err) {
      console.error(
        "Load media error:",
        err
      );

      setError(
        "Gagal memuat data media."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ===================================================
  // SAVE MEDIA
  // ===================================================

  const saveMedia = async (
    newMedia: MediaItem[]
  ) => {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(newMedia)
        );

        return;
      }

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newMedia)
      );
    } catch (err) {
      console.error(
        "Save media error:",
        err
      );
    }
  };

  // ===================================================
  // IMPORT MEDIA
  // ===================================================

  const importMedia = async (
    type: MediaType
  ) => {
    try {
      setError(null);
      setIsImporting(true);

      console.log(
        "================================="
      );

      console.log(
        "Memulai import:",
        type
      );

      // -----------------------------------------------
      // MIME TYPE
      // -----------------------------------------------

      let mimeTypes: string[] = [];

      if (type === "audio") {
        mimeTypes = ["audio/*"];
      }

      if (type === "video") {
        mimeTypes = ["video/*"];
      }

      if (type === "image") {
        mimeTypes = ["image/*"];
      }

      console.log(
        "MIME type:",
        mimeTypes
      );

      // -----------------------------------------------
      // DOCUMENT PICKER
      // -----------------------------------------------

      const result =
        await DocumentPicker.getDocumentAsync(
          {
            type: mimeTypes,
            multiple: false,
            copyToCacheDirectory: true,
          }
        );

      console.log(
        "DocumentPicker result:",
        result
      );

      // -----------------------------------------------
      // USER CANCEL
      // -----------------------------------------------

      if (result.canceled) {
        console.log(
          "Import dibatalkan oleh user."
        );

        return;
      }

      // -----------------------------------------------
      // CEK ASSET
      // -----------------------------------------------

      if (
        !result.assets ||
        result.assets.length === 0
      ) {
        console.log(
          "Tidak ada file yang dipilih."
        );

        return;
      }

      const asset =
        result.assets[0];

      console.log(
        "Nama file:",
        asset.name
      );

      console.log(
        "URI:",
        asset.uri
      );

      console.log(
        "Ukuran:",
        asset.size
      );

      console.log(
        "MIME:",
        asset.mimeType
      );

      // -----------------------------------------------
      // CEK UKURAN FILE
      // -----------------------------------------------

      if (
        asset.size !== undefined &&
        asset.size > MAX_FILE_SIZE[type]
      ) {
        const message =
          `Ukuran ${type} terlalu besar. ` +
          `Maksimal ${MAX_FILE_SIZE_LABEL[type]}.`;

        console.log(
          "FILE DITOLAK:",
          message
        );

        setError(message);

        return;
      }

      // -----------------------------------------------
      // BUAT MEDIA ITEM
      // -----------------------------------------------

      const newItem: MediaItem = {
        id:
          Date.now().toString() +
          Math.random()
            .toString(36)
            .substring(2, 9),

        uri: asset.uri,

        name: asset.name,

        type,

        size:
          asset.size ?? 0,

        mimeType:
          asset.mimeType ??
          undefined,

        lastModified:
          asset.lastModified ??
          undefined,

        createdAt:
          Date.now(),
      };

      console.log(
        "Media baru:",
        newItem
      );

      // -----------------------------------------------
      // TAMBAHKAN KE LIST
      // -----------------------------------------------

      const newMedia = [
        newItem,
        ...media,
      ];

      setMedia(newMedia);

      // -----------------------------------------------
      // SIMPAN
      // -----------------------------------------------

      await saveMedia(newMedia);

      console.log(
        "Media berhasil disimpan."
      );

      console.log(
        "================================="
      );
    } catch (err) {
      console.error(
        "Import error:",
        err
      );

      setError(
        "Gagal mengimpor file."
      );
    } finally {
      setIsImporting(false);
    }
  };

  // ===================================================
  // IMPORT SHORTCUT
  // ===================================================

  const pickAudio = async () => {
    await importMedia("audio");
  };

  const pickVideo = async () => {
    await importMedia("video");
  };

  const pickImage = async () => {
    await importMedia("image");
  };

  // ===================================================
  // REMOVE MEDIA
  // ===================================================

  const removeMedia = async (
    id: string
  ) => {
    try {
      console.log(
        "Menghapus media:",
        id
      );

      const newMedia =
        media.filter(
          (item) =>
            item.id !== id
        );

      setMedia(newMedia);

      await saveMedia(newMedia);

      console.log(
        "Media berhasil dihapus."
      );
    } catch (err) {
      console.error(
        "Remove media error:",
        err
      );

      setError(
        "Gagal menghapus media."
      );
    }
  };

  // ===================================================
  // FILTER AUDIO
  // ===================================================

  const audios = useMemo(
    () =>
      media.filter(
        (item) =>
          item.type === "audio"
      ),
    [media]
  );

  // ===================================================
  // FILTER VIDEO
  // ===================================================

  const videos = useMemo(
    () =>
      media.filter(
        (item) =>
          item.type === "video"
      ),
    [media]
  );

  // ===================================================
  // FILTER IMAGE
  // ===================================================

  const images = useMemo(
    () =>
      media.filter(
        (item) =>
          item.type === "image"
      ),
    [media]
  );

  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  const value: MediaContextType = {
    media,

    audios,

    videos,

    images,

    isLoading,

    isImporting,

    error,

    importMedia,

    pickAudio,

    pickVideo,

    pickImage,

    removeMedia,
  };

  // ===================================================
  // PROVIDER
  // ===================================================

  return (
    <MediaContext.Provider
      value={value}
    >
      {children}
    </MediaContext.Provider>
  );
}

// =====================================================
// USE MEDIA
// =====================================================

export function useMedia() {
  const context =
    useContext(MediaContext);

  if (!context) {
    throw new Error(
      "useMedia harus digunakan di dalam MediaProvider"
    );
  }

  return context;
}