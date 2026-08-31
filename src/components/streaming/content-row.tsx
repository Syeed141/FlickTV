import type { MediaItem } from "@/types/media";
import { MediaCard } from "@/components/streaming/media-card";

export function ContentRow({
  title,
  items,
  action,
}: {
  title: string;
  items: MediaItem[];
  action?: React.ReactNode;
}) {
  if (!items.length) return null;

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        {action}
      </div>
      <div className="content-row px-4 sm:px-6 lg:px-8">
        {items.map((item) => (
          <MediaCard key={`${item.mediaType}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
