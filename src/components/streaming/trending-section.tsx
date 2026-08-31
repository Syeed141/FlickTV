"use client";

import { useMemo, useState } from "react";
import type { MediaItem } from "@/types/media";
import { MediaCard } from "@/components/streaming/media-card";
import { cn } from "@/lib/utils";

type Tab = "day" | "week";
type Kind = "all" | "movie" | "tv";

export function TrendingSection({
  dayMovies,
  dayTv,
  weekMovies,
  weekTv,
}: {
  dayMovies: MediaItem[];
  dayTv: MediaItem[];
  weekMovies: MediaItem[];
  weekTv: MediaItem[];
}) {
  const [window, setWindow] = useState<Tab>("day");
  const [kind, setKind] = useState<Kind>("all");

  const items = useMemo(() => {
    const movies = window === "day" ? dayMovies : weekMovies;
    const tv = window === "day" ? dayTv : weekTv;
    if (kind === "movie") return movies;
    if (kind === "tv") return tv;
    return [...movies, ...tv]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 18);
  }, [window, kind, dayMovies, dayTv, weekMovies, weekTv]);

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-4 flex flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold sm:text-2xl">Trending</h2>
        <div className="flex flex-wrap gap-2">
          {([
            ["day", "Day"],
            ["week", "Week"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setWindow(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                window === value
                  ? "bg-accent text-white"
                  : "bg-white/5 text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
          <span className="mx-1 hidden h-6 w-px bg-white/10 sm:inline-block" />
          {([
            ["all", "All"],
            ["movie", "Movies"],
            ["tv", "TV"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setKind(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                kind === value
                  ? "bg-white text-background"
                  : "bg-white/5 text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="content-row px-4 sm:px-6 lg:px-8">
        {items.map((item) => (
          <MediaCard key={`trend-${item.mediaType}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
