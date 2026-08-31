import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import type { MediaDetail } from "@/types/media";

export function MediaDetailView({ item }: { item: MediaDetail }) {
  return (
    <article>
      <section className="relative min-h-[55vh] overflow-hidden pt-20">
        {item.backdropUrl ? (
          <Image
            src={item.backdropUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-12 pt-16 sm:flex-row sm:items-end sm:px-6 lg:px-8">
          <div className="relative mx-auto aspect-[2/3] w-44 shrink-0 overflow-hidden rounded-xl shadow-2xl sm:mx-0 sm:w-52">
            {item.posterUrl ? (
              <Image
                src={item.posterUrl}
                alt={item.title}
                fill
                sizes="208px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-surface text-sm text-muted">
                No poster
              </div>
            )}
          </div>

          <div className="flex-1 pb-2">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <span className="rounded bg-accent px-2 py-0.5 text-white">
                {item.mediaType === "movie" ? "Movie" : "TV Series"}
              </span>
              {item.quality ? (
                <span className="rounded border border-white/20 px-2 py-0.5">
                  {item.quality}
                </span>
              ) : null}
              {item.year ? <span>{item.year}</span> : null}
              {item.runtime ? <span>{item.runtime} min</span> : null}
              {item.seasons ? <span>{item.seasons} seasons</span> : null}
              {item.rating > 0 ? (
                <span className="inline-flex items-center gap-1 text-warm">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {item.rating.toFixed(1)}
                </span>
              ) : null}
            </div>

            <h1 className="text-3xl font-bold sm:text-5xl">{item.title}</h1>
            {item.tagline ? (
              <p className="mt-2 text-sm italic text-muted">{item.tagline}</p>
            ) : null}
            {item.genres.length ? (
              <p className="mt-3 text-sm text-muted">{item.genres.join(" · ")}</p>
            ) : null}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {item.overview}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/plans" className="btn-primary">
                <Play className="h-4 w-4 fill-current" />
                Get access
              </Link>
              <Link href={item.mediaType === "movie" ? "/movies" : "/tv"} className="btn-secondary">
                Back to browse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {item.cast.length ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-xl font-bold">Cast</h2>
          <div className="content-row">
            {item.cast.map((person) => (
              <div
                key={person.id}
                className="w-28 shrink-0 overflow-hidden rounded-lg bg-surface sm:w-32"
              >
                <div className="relative aspect-[2/3] bg-surface-elevated">
                  {person.profileUrl ? (
                    <Image
                      src={person.profileUrl}
                      alt={person.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-2">
                  <p className="line-clamp-1 text-xs font-medium">{person.name}</p>
                  <p className="line-clamp-1 text-[10px] text-muted">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
