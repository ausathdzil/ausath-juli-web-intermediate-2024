import MovieSearchForm from '@/components/movies/search-form';
import { searchMovies } from '@/lib/data';
import { MovieSearchParams } from '@/lib/definitions/movie';
import Image from 'next/image';
import { Suspense } from 'react';

type SearchParams = Promise<MovieSearchParams>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query, page } = await searchParams;
  const data = await searchMovies({ query, page });
  const movies = data?.results;

  return (
    <>
      <section className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <MovieSearchForm />
        </Suspense>
      </section>
      <section className="space-y-8">
        <ul className="grid grid-cols-3 gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            {movies?.map((movie) => (
              <li key={movie.id}>
                <figure className="max-w-[300px] text-center space-y-2">
                  <Image
                    className="rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    width={300}
                    height={500}
                  />
                  <figcaption className="max-w-full">{movie.title}</figcaption>
                </figure>
              </li>
            ))}
          </Suspense>
        </ul>
      </section>
    </>
  );
}
