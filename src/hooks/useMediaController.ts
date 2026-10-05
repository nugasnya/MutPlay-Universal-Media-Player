import { useMedia } from '../context/MediaContext';

export function useMediaController() {
  const media = useMedia();
  return {
    ...media,
    total: media.media.length,
  };
}
