import { MediaType } from "../types/media";

export const MEDIA_TYPES: MediaType[] = [
  "audio",
  "video",
  "image",
];

export const MEDIA_LABELS: Record<
  MediaType,
  string
> = {
  audio: "Audio",
  video: "Video",
  image: "Gambar",
};

export const MEDIA_ICONS: Record<
  MediaType,
  string
> = {
  audio: "🎵",
  video: "🎬",
  image: "🖼️",
};