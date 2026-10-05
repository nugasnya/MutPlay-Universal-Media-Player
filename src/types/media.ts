export type MediaType =
  | "audio"
  | "video"
  | "image";

export type Section =
  | "home"
  | MediaType;

export type MediaItem = {
  id: string;
  uri: string;
  name: string;
  type: MediaType;
  size?: number;
  mimeType?: string;
  lastModified?: number;
  createdAt: number;
};