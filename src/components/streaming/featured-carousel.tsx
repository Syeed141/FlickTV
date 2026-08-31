"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import type { MediaItem } from "@/types/media";
import { mediaHref } from "@/types/media";
import { cn } from "@/lib/utils";

export function FeaturedCarousel({ items }: { items: MediaItem[] }) {
  const slides = items.filter((item) => item.backdropUrl).slice(0, 8);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-surface px-4 pt-24">
        <p className="text-muted">Featured titles will appear here.</p>
      </section>
    );
  }

  const current = slides[index];

  return (
    <section className="relative min-h-[70vh] overflow-hidden pt-16 sm:min-h-[80vh] sm:pt-20">
      {slides.map((slide, i) => (
        <div
          key={`${slide.mediaType}-${slide.id}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          {slide.backdropUrl ? (
            <Image
              src={slide.backdropUrl}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-top"
            />
          ) : null}
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:min-h-[80vh] sm:px-6 sm:pb-16 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <span className="rounded bg-accent px-2 py-0.5 text-white">
              {current.mediaType === "movie" ? "Movie" : "TV Series"}
            </span>
            {current.quality ? (
              <span className="rounded border border-white/20 px-2 py-0.5">
                {current.quality}
              </span>
            ) : null}
            {current.year ? <span>{current.year}</span> : null}
            {current.rating > 0 ? (
              <span className="inline-flex items-center gap-1 text-warm">
                <Star className="h-3.5 w-3.5 fill-current" />
                {current.rating.toFixed(1)}
              </span>
            ) : null}
          </div>

          <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {current.title}
          </h1>

          {current.genres.length ? (
            <p className="mt-3 text-sm text-muted">{current.genres.join(" · ")}</p>
          ) : null}

          <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {current.overview}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/plans" className="btn-primary">
              <Play className="h-4 w-4 fill-current" />
              Watch with FlickTv
            </Link>
            <Link href={mediaHref(current)} className="btn-secondary">
              Details
            </Link>
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="mt-8 flex gap-2">
            {slides.map((slide, i) => (
              <button
                key={`${slide.mediaType}-${slide.id}-dot`}
                type="button"
                aria-label={`Show ${slide.title}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-accent" : "w-3 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
