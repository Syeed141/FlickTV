import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMediaDetail } from "@/lib/tmdb";
import { MediaDetailView } from "@/components/streaming/media-detail-view";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const item = await getMediaDetail("movie", Number(id));
    return {
      title: item.title,
      description: item.overview.slice(0, 160),
    };
  } catch {
    return { title: "Movie" };
  }
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  try {
    const item = await getMediaDetail("movie", numericId);
    return <MediaDetailView item={item} />;
  } catch {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <p className="mt-2 text-sm text-muted">
          This title couldn&apos;t be loaded. Check your TMDB key or try another movie.
        </p>
        <Link href="/movies" className="btn-primary mt-6">
          Back to movies
        </Link>
      </div>
    );
  }
}
