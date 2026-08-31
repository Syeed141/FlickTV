import type { Metadata } from "next";
import Link from "next/link";
import { getPopular } from "@/lib/tmdb";
import type { MediaItem } from "@/types/media";
import { MediaGrid } from "@/components/streaming/media-grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Movies",
  description: "Browse popular movies available with FlickTv.",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  let items: MediaItem[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const data = await getPopular("movie", page);
    items = data.items;
    totalPages = Math.min(data.totalPages, 20);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load movies.";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Browse</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Movies</h1>
        <p className="mt-2 text-sm text-muted">
          Popular titles from around the world. Get full access with a FlickTv plan.
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
              <Link
                href={`/movies?page=${page - 1}`}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Previous
              </Link>
            ) : null}
            <span className="text-sm text-muted">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={`/movies?page=${page + 1}`}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Next
              </Link>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
