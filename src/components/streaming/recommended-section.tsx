"use client";

import { useState } from "react";
import type { MediaItem } from "@/types/media";
import { ContentRow } from "@/components/streaming/content-row";
import { cn } from "@/lib/utils";

export function RecommendedSection({
  movies,
  tv,
}: {
  movies: MediaItem[];
  tv: MediaItem[];
}) {
  const [tab, setTab] = useState<"movie" | "tv">("movie");
  const items = tab === "movie" ? movies : tv;

  return (
    <ContentRow
      title="Recommended"
      items={items}
      action={
        <div className="flex gap-2">
          {([
            ["movie", "Movies"],
            ["tv", "TV Series"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                tab === value
                  ? "bg-accent text-white"
                  : "bg-white/5 text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      }
    />
  );
}
