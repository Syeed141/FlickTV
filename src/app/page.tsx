import Link from "next/link";
import {
  getFeatured,
  getLatestMovies,
  getLatestTv,
  getPopular,
  getTrending,
} from "@/lib/tmdb";
import { FeaturedCarousel } from "@/components/streaming/featured-carousel";
import { ContentRow } from "@/components/streaming/content-row";
import { RecommendedSection } from "@/components/streaming/recommended-section";
import { TrendingSection } from "@/components/streaming/trending-section";

export const dynamic = "force-dynamic";

async function loadHomeData() {
  try {
    const [
      featured,
      popularMovies,
      popularTv,
      latestMovies,
      latestTv,
      trendingDayMovies,
      trendingDayTv,
      trendingWeekMovies,
      trendingWeekTv,
    ] = await Promise.all([
      getFeatured(8),
      getPopular("movie"),
      getPopular("tv"),
      getLatestMovies(),
      getLatestTv(),
      getTrending("movie", "day"),
      getTrending("tv", "day"),
      getTrending("movie", "week"),
      getTrending("tv", "week"),
    ]);

    return {
      featured,
      popularMovies: popularMovies.items,
      popularTv: popularTv.items,
      latestMovies: latestMovies.items,
      latestTv: latestTv.items,
      trendingDayMovies: trendingDayMovies.items,
      trendingDayTv: trendingDayTv.items,
      trendingWeekMovies: trendingWeekMovies.items,
      trendingWeekTv: trendingWeekTv.items,
      error: null as string | null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load catalog.";
    return {
      featured: [],
      popularMovies: [],
      popularTv: [],
      latestMovies: [],
      latestTv: [],
      trendingDayMovies: [],
      trendingDayTv: [],
      trendingWeekMovies: [],
      trendingWeekTv: [],
      error: message,
    };
  }
}

export default async function HomePage() {
  const data = await loadHomeData();

  return (
    <>
      {data.error ? (
        <div className="mx-auto max-w-3xl px-4 pb-8 pt-28">
          <div className="rounded-xl border border-accent/30 bg-accent-dim px-5 py-4 text-sm text-white/90">
            <p className="font-semibold text-accent">Catalog unavailable</p>
            <p className="mt-1 text-muted">{data.error}</p>
            <p className="mt-2 text-muted">
              Add your TMDB API key to <code className="text-foreground">.env.local</code>{" "}
              (see <code className="text-foreground">.env.example</code>).
            </p>
          </div>
        </div>
      ) : null}

      <FeaturedCarousel items={data.featured} />

      <RecommendedSection movies={data.popularMovies} tv={data.popularTv} />
      <ContentRow
        title="Latest Movies"
        items={data.latestMovies}
        action={
          <Link href="/movies" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        }
      />
      <ContentRow
        title="Latest TV Shows"
        items={data.latestTv}
        action={
          <Link href="/tv" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        }
      />
      <TrendingSection
        dayMovies={data.trendingDayMovies}
        dayTv={data.trendingDayTv}
        weekMovies={data.trendingWeekMovies}
        weekTv={data.trendingWeekTv}
      />

      <section className="border-t border-white/8 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Watch movies &amp; TV shows in HD
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            FlickTv brings live sports, global channels, movies, and complete series together in
            one subscription. Browse what&apos;s popular, pick a plan, and get set up over WhatsApp —
            usually within minutes.
          </p>
          <Link href="/plans" className="btn-primary mt-8">
            Start free trial
          </Link>
        </div>
      </section>
    </>
  );
}
