import React, { useState, useEffect } from 'react';

// Interface struktur data media untuk MutPlay
interface MediaItem {
  id: string;
  title: string;
  type: 'audio' | 'video' | 'image';
}

export function useMediaFetch() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Poin 1.2 & 1.3: ASYNC FUNCTION & AWAIT (Cara Modern & Direkomendasikan)
   * Poin 2: API CALL menggunakan fungsi Fetch bawaan JavaScript
   */
  const fetchMediaAsync = async () => {
    try {
      setLoading(true);
      setError(null);

      // Melakukan HTTP Request ke API publik sebagai contoh data
      const response = await fetch('https://typicode.com');
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari API Server');
      }

      // Menunggu (await) konversi data ke format JSON
      const data = await response.json();
      
      // Mengubah (mapping) data API menjadi format yang dimengerti oleh MediaCard MutPlay
      const formattedData: MediaItem[] = data.map((item: any, index: number) => {
        const mediaTypes: ('audio' | 'video' | 'image')[] = ['audio', 'video', 'image'];
        return {
          id: String(item.id),
          title: item.title,
          type: mediaTypes[index % 3], // Selang-seling tipe media untuk variasi
        };
      });

      setMediaList(formattedData);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan jaringan');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Poin 1.4: MENGGUNAKAN .THEN() & .CATCH() (Pendekatan Berbasis Awal Promise)
   * Ini adalah alternatif dari Async/Await untuk menunjukkan pemahaman materi silabus.
   */
  const fetchMediaWithThen = () => {
    setLoading(true);
    setError(null);

    fetch('https://typicode.com')
      .then((response) => {
        if (!response.ok) throw new Error('Respon server tidak sukses');
        return response.json();
      })
      .then((data) => {
        const formattedData: MediaItem[] = data.map((item: any, index: number) => {
          const mediaTypes: ('audio' | 'video' | 'image')[] = ['audio', 'video', 'image'];
          return {
            id: String(item.id),
            title: item.title,
            type: mediaTypes[index % 3],
          };
        });
        setMediaList(formattedData);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Poin 1.1: Efek samping Asynchronous dijalankan otomatis saat komponen dipasang
  useEffect(() => {
    fetchMediaAsync(); // Menggunakan metode async/await saat pertama kali dibuka
  }, []);

  return { 
    mediaList, 
    loading, 
    error, 
    refetch: fetchMediaAsync, 
    refetchOldWay: fetchMediaWithThen 
  };
}
