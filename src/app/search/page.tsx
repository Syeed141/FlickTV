import type { Metadata } from "next";
import Link from "next/link";
import { searchMedia } from "@/lib/tmdb";
import type { MediaItem } from "@/types/media";
import { MediaGrid } from "@/components/streaming/media-grid";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q?.trim();

  return {
    title: q ? `Search: ${q}` : "Search",
    description: q
      ? `Search results for "${q}" on FlickTv.`
      : "Search movies and TV shows on FlickTv.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  let items: MediaItem[] = [];
  let totalPages = 0;
  let error: string | null = null;

  if (q) {
    try {
      const data = await searchMedia(q, page);
      items = data.items;
      totalPages = data.totalPages;
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load search results.";
    }
  }

  const buildHref = (nextPage: number) => {
    const search = new URLSearchParams({ q, page: String(nextPage) });
    return `/search?${search.toString()}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Search</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {q ? `Results for "${q}"` : "Find movies & TV"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {q
            ? items.length
              ? `${items.length} title${items.length === 1 ? "" : "s"} on this page.`
              : "No matches found. Try a different title."
            : "Use the search bar in the header to find movies and TV shows."}
        </p>
      </div>

      {error ? (
        <p className="rounded-xl border border-accent/30 bg-accent-dim px-4 py-3 text-sm text-muted">
          {error}
        </p>
      ) : q ? (
        <>
          <MediaGrid items={items} />
          {totalPages > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-3">
              {page > 1 ? (
                <Link href={buildHref(page - 1)} className="btn-secondary px-4 py-2 text-sm">
                  Previous
                </Link>
              ) : null}
              <span className="text-sm text-muted">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={buildHref(page + 1)} className="btn-secondary px-4 py-2 text-sm">
                  Next
                </Link>
              ) : null}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
