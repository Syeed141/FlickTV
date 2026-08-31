import Image from "next/image";
import Link from "next/link";
import type { MediaItem } from "@/types/media";
import { mediaHref } from "@/types/media";
import { cn } from "@/lib/utils";

export function MediaCard({
  item,
  className,
}: {
  item: MediaItem;
  className?: string;
}) {
  const href = mediaHref(item);

  return (
    <Link
      href={href}
      className={cn(
        "media-card group block overflow-hidden rounded-lg bg-surface transition hover:-translate-y-0.5 hover:ring-1 hover:ring-accent/50",
        className,
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-elevated">
        {item.posterUrl ? (
          <Image
            src={item.posterUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, 12rem"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted">
            No poster
          </div>
        )}
        {item.quality ? <span className="quality-badge">{item.quality}</span> : null}
        {item.rating > 0 ? (
          <span className="absolute right-2 top-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold text-warm">
            ★ {item.rating.toFixed(1)}
          </span>
        ) : null}
      </div>
      <div className="space-y-0.5 p-2.5">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-accent">
          {item.title}
        </h3>
        <p className="text-xs text-muted">
          {item.year}
          {item.mediaType === "tv" ? " · Series" : ""}
        </p>
      </div>
    </Link>
  );
}
