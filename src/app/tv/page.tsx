import type { Metadata } from "next";
import Link from "next/link";
import { getPopular } from "@/lib/tmdb";
import type { MediaItem } from "@/types/media";
import { MediaGrid } from "@/components/streaming/media-grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TV Shows",
  description: "Browse popular TV shows available with FlickTv.",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function TvPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  let items: MediaItem[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const data = await getPopular("tv", page);
    items = data.items;
    totalPages = Math.min(data.totalPages, 20);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load TV shows.";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Browse</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">TV Shows</h1>
        <p className="mt-2 text-sm text-muted">
          Series people are watching right now. Unlock everything with FlickTv.
        </p>
      </div>

      {error ? (
        <p className="rounded-xl border border-accent/30 bg-accent-dim px-4 py-3 text-sm text-muted">
          {error}
        </p>
      ) : (
        <>
          <MediaGrid items={items} />
          <div className="mt-10 flex items-center justify-center gap-3">
            {page > 1 ? (
              <Link href={`/tv?page=${page - 1}`} className="btn-secondary px-4 py-2 text-sm">
                Previous
              </Link>
            ) : null}
            <span className="text-sm text-muted">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link href={`/tv?page=${page + 1}`} className="btn-secondary px-4 py-2 text-sm">
                Next
              </Link>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
