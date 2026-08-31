import type { MediaDetail, MediaItem, MediaType } from "@/types/media";

export { mediaHref } from "@/types/media";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

type TmdbGenre = { id: number; name: string };

type TmdbListItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  genre_ids?: number[];
  media_type?: string;
};

type TmdbDetail = TmdbListItem & {
  genres?: TmdbGenre[];
  runtime?: number;
  episode_run_time?: number[];
  tagline?: string;
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
};

type TmdbPagedResponse = {
  page: number;
  results: TmdbListItem[];
  total_pages: number;
  total_results: number;
};

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "Missing TMDB_API_KEY. Add it to .env.local (see .env.example).",
    );
  }
  return key;
}

function posterUrl(path: string | null, size: "w342" | "w500" = "w500") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

function backdropUrl(path: string | null) {
  return path ? `${IMAGE_BASE}/w1280${path}` : null;
}

function yearFromDate(date?: string) {
  return date?.slice(0, 4) || "";
}

function qualityFor(rating: number) {
  if (rating >= 8) return "4K";
  if (rating >= 6.5) return "1080P";
  return "HD";
}

function normalizeItem(
  item: TmdbListItem,
  mediaType: MediaType,
  genreMap?: Map<number, string>,
): MediaItem {
  const type =
    item.media_type === "tv" || item.media_type === "movie"
      ? (item.media_type as MediaType)
      : mediaType;

  const genres =
    item.genre_ids
      ?.map((id) => genreMap?.get(id))
      .filter((name): name is string => Boolean(name))
      .slice(0, 3) ?? [];

  return {
    id: item.id,
    title: item.title || item.name || "Untitled",
    posterUrl: posterUrl(item.poster_path),
    backdropUrl: backdropUrl(item.backdrop_path),
    rating: Math.round(item.vote_average * 10) / 10,
    year: yearFromDate(item.release_date || item.first_air_date),
    overview: item.overview || "",
    genres,
    mediaType: type,
    quality: qualityFor(item.vote_average),
  };
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

let genreCache: Map<number, string> | null = null;

async function getGenreMap(): Promise<Map<number, string>> {
  if (genreCache) return genreCache;

  const [movies, tv] = await Promise.all([
    tmdbFetch<{ genres: TmdbGenre[] }>("/genre/movie/list"),
    tmdbFetch<{ genres: TmdbGenre[] }>("/genre/tv/list"),
  ]);

  const map = new Map<number, string>();
  for (const g of [...movies.genres, ...tv.genres]) {
    map.set(g.id, g.name);
  }
  genreCache = map;
  return map;
}

async function list(
  path: string,
  mediaType: MediaType,
  page = 1,
): Promise<{ items: MediaItem[]; totalPages: number }> {
  const genreMap = await getGenreMap();
  const data = await tmdbFetch<TmdbPagedResponse>(path, { page: String(page) });
  return {
    items: data.results
      .filter((r) => r.media_type !== "person")
      .map((r) => normalizeItem(r, mediaType, genreMap)),
    totalPages: data.total_pages,
  };
}

export async function getTrending(
  mediaType: MediaType,
  window: "day" | "week" = "day",
  page = 1,
) {
  return list(`/trending/${mediaType}/${window}`, mediaType, page);
}

export async function getPopular(mediaType: MediaType, page = 1) {
  return list(`/${mediaType}/popular`, mediaType, page);
}

export async function getLatestMovies(page = 1) {
  return list("/movie/now_playing", "movie", page);
}

export async function getLatestTv(page = 1) {
  return list("/tv/on_the_air", "tv", page);
}

export async function searchMedia(query: string, page = 1) {
  const trimmed = query.trim();
  if (!trimmed) {
    return { items: [], totalPages: 0 };
  }

  const genreMap = await getGenreMap();
  const data = await tmdbFetch<TmdbPagedResponse>("/search/multi", {
    query: trimmed,
    page: String(page),
    include_adult: "false",
  });

  const items = data.results
    .filter((r) => r.media_type === "movie" || r.media_type === "tv")
    .map((r) =>
      normalizeItem(
        r,
        r.media_type === "tv" ? "tv" : "movie",
        genreMap,
      ),
    );

  return {
    items,
    totalPages: Math.min(data.total_pages, 20),
  };
}

export async function getFeatured(limit = 8): Promise<MediaItem[]> {
  const [movies, tv] = await Promise.all([
    getTrending("movie", "day"),
    getTrending("tv", "day"),
  ]);

  const mixed = [...movies.items, ...tv.items]
    .filter((item) => item.backdropUrl)
    .sort((a, b) => b.rating - a.rating);

  const seen = new Set<string>();
  const unique: MediaItem[] = [];
  for (const item of mixed) {
    const key = `${item.mediaType}-${item.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= limit) break;
  }
  return unique;
}

export async function getMediaDetail(
  mediaType: MediaType,
  id: number,
): Promise<MediaDetail> {
  const data = await tmdbFetch<TmdbDetail>(`/${mediaType}/${id}`, {
    append_to_response: "credits",
  });

  const base = normalizeItem(data, mediaType);
  const genres = data.genres?.map((g) => g.name) ?? base.genres;

  return {
    ...base,
    genres,
    runtime:
      mediaType === "movie"
        ? data.runtime ?? null
        : data.episode_run_time?.[0] ?? null,
    tagline: data.tagline,
    status: data.status,
    seasons: data.number_of_seasons ?? null,
    episodeCount: data.number_of_episodes ?? null,
    cast: (data.credits?.cast ?? []).slice(0, 10).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profileUrl: posterUrl(c.profile_path, "w342"),
    })),
  };
}

