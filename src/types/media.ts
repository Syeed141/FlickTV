export type MediaType = "movie" | "tv";

export type MediaItem = {
  id: number;
  title: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  rating: number;
  year: string;
  overview: string;
  genres: string[];
  mediaType: MediaType;
  runtime?: number | null;
  quality?: string;
};

export type MediaDetail = MediaItem & {
  tagline?: string;
  status?: string;
  cast: { id: number; name: string; character: string; profileUrl: string | null }[];
  seasons?: number | null;
  episodeCount?: number | null;
};

export function mediaHref(item: Pick<MediaItem, "id" | "mediaType">) {
  return item.mediaType === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
}
