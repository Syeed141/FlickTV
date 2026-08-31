import type { MediaItem } from "@/types/media";
import { MediaCard } from "@/components/streaming/media-card";

export function MediaGrid({ items }: { items: MediaItem[] }) {
  if (!items.length) {
    return (
      <p className="py-16 text-center text-muted">No titles found right now.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <MediaCard
          key={`${item.mediaType}-${item.id}`}
          item={item}
          className="!w-full"
        />
      ))}
    </div>
  );
}
