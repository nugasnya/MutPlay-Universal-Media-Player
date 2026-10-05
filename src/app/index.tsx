import React, { useMemo, useState } from 'react';
import { Platform, Text } from 'react-native';
import { router } from 'expo-router';

import MediaLayout from '../components/layout/MediaLayout';
import Dashboard from '../components/dashboard/Dashboard';
import AudioCollection from '../components/collections/AudioCollection';
import VideoCollection from '../components/collections/VideoCollection';
import ImageCollection from '../components/collections/ImageCollection';
import Loading from '../components/common/Loading';

import { useMediaController } from '../hooks/useMediaController';
import { useMediaSearch } from '../hooks/useMediaSearch';

import {
  MediaItem,
  Section,
} from '../types/media';

export default function Home() {
  const {
    media,
    audios,
    videos,
    images,
    isLoading,
    isImporting,
    error,
    importMedia,
    removeMedia,
  } = useMediaController();

  const [active, setActive] =
    useState<Section>('home');

  const [query, setQuery] = useState('');

  const { results } =
    useMediaSearch(media);

  const openMedia = (item: MediaItem) => {
    if (item.type === 'audio') {
      router.push({
        pathname: '/media/audio-player',
        params: { id: item.id },
      });
    }

    if (item.type === 'video') {
      router.push({
        pathname: '/media/video-player',
        params: { id: item.id },
      });
    }

    if (item.type === 'image') {
      router.push({
        pathname: '/media/image-viewer',
        params: { id: item.id },
      });
    }
  };

  // =========================
  // HAPUS MEDIA
  // =========================
  const remove = async (item: MediaItem) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `Hapus media "${item.name}"?`
      );

      if (confirmed) {
        await removeMedia(item.id);
      }

      return;
    }

    const { Alert } = require('react-native');

    Alert.alert(
      'Hapus media?',
      item.name,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            await removeMedia(item.id);
          },
        },
      ]
    );
  };

  const sectionItems =
    active === 'audio'
      ? audios
      : active === 'video'
      ? videos
      : images;

  const filtered = useMemo(
    () =>
      active === 'home'
        ? results
        : sectionItems.filter((x) =>
            x.name
              .toLowerCase()
              .includes(query.toLowerCase())
          ),
    [
      active,
      results,
      sectionItems,
      query,
    ]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isImporting) {
    return (
      <MediaLayout
        active={active}
        onSelect={setActive}
        onImport={importMedia}
        query={query}
        onQuery={setQuery}
      >
        <Text
          style={{
            color: '#fff',
            padding: 25,
          }}
        >
          Sedang mengimpor file...
        </Text>
      </MediaLayout>
    );
  }

  return (
    <MediaLayout
      active={active}
      onSelect={setActive}
      onImport={importMedia}
      query={query}
      onQuery={setQuery}
    >
      {error ? (
        <Text
          style={{
            color: '#f66',
            paddingHorizontal: 20,
            paddingTop: 12,
          }}
        >
          {error}
        </Text>
      ) : null}

      {active === 'home' && (
        <Dashboard
          media={filtered}
          counts={{
            audio: audios.length,
            video: videos.length,
            image: images.length,
          }}
          onSection={setActive}
          onMedia={openMedia}
          onDelete={remove}
        />
      )}

      {active === 'audio' && (
        <AudioCollection
          items={filtered}
          onPress={openMedia}
          onDelete={remove}
          onImport={() =>
            importMedia('audio')
          }
          query={query}
          onQuery={setQuery}
        />
      )}

      {active === 'video' && (
        <VideoCollection
          items={filtered}
          onPress={openMedia}
          onDelete={remove}
          onImport={() =>
            importMedia('video')
          }
          query={query}
          onQuery={setQuery}
        />
      )}

      {active === 'image' && (
        <ImageCollection
          items={filtered}
          onPress={openMedia}
          onDelete={remove}
          onImport={() =>
            importMedia('image')
          }
          query={query}
          onQuery={setQuery}
        />
      )}
    </MediaLayout>
  );
}