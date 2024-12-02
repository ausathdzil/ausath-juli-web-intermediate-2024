import { Suspense } from 'react';
import Image from 'next/image';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/lib/data';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <section className="space-y-4 w-full py-8">
        <h1 className="text-3xl text-center font-semibold mb-10">
          Now Playing
        </h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <NowPlayingSection />
        </Suspense>
      </section>
      <section className="space-y-4 w-full py-8">
        <h1 className="text-3xl text-center font-semibold mb-10">
          Popular Movies
        </h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <PopularSection />
        </Suspense>
      </section>
      <section className="space-y-4 w-full py-8">
        <h1 className="text-3xl text-center font-semibold mb-10">Top Rated</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <TopRatedSection />
        </Suspense>
      </section>
      <section className="space-y-4 w-full py-8">
        <h1 className="text-3xl text-center font-semibold mb-10">Upcoming</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <UpcomingSection />
        </Suspense>
      </section>
    </>
  );
}

// NowPlayingSection Component tanpa Carousel
async function NowPlayingSection() {
  const movies = await getNowPlayingMovies();

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {movies?.slice(0, 4).map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className="bg-white rounded-lg shadow overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-[400px]">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="rounded-lg object-cover"
                fill
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-medium text-gray-800">{movie.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(movie.release_date).toLocaleDateString('en-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// PopularSection Component
async function PopularSection() {
  const movies = await getPopularMovies();

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {movies?.slice(0, 4).map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className="bg-white rounded-lg shadow overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-[400px]">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="rounded-lg object-cover"
                fill
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-medium text-gray-800">{movie.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(movie.release_date).toLocaleDateString('en-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// TopRatedSection Component
async function TopRatedSection() {
  const movies = await getTopRatedMovies();

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {movies?.slice(0, 4).map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className="bg-white rounded-lg shadow overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-[400px]">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="rounded-lg object-cover"
                fill
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-medium text-gray-800">{movie.title}</p>
              <p className="text-sm text-gray-600">⭐ {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// UpcomingSection Component
async function UpcomingSection() {
  const movies = await getUpcomingMovies();

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {movies?.slice(0, 4).map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className="bg-white rounded-lg shadow overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-[400px]">
              <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="rounded-lg object-cover"
                fill
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-medium text-gray-800">{movie.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(movie.release_date).toLocaleDateString('en-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
