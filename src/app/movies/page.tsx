import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/lib/data';

export default function Page() {
  return (
    <>
      <NowPlayingSection />
      <PopularSection />
      <TopRatedSection />
      <UpcomingSection />
    </>
  );
}

async function NowPlayingSection() {
  const movies = await getNowPlayingMovies();

  return (
    <section>
      <h1>Now Playing</h1>
    </section>
  );
}

async function PopularSection() {
  const movies = await getPopularMovies();

  return (
    <section>
      <h1>Popular</h1>
    </section>
  );
}

async function TopRatedSection() {
  const movies = await getTopRatedMovies();

  return (
    <section>
      <h1>Top Rated</h1>
    </section>
  );
}

async function UpcomingSection() {
  const movies = await getUpcomingMovies();

  return (
    <section>
      <h1>Upcoming</h1>
    </section>
  );
}
