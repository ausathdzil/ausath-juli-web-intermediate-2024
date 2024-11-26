import MovieSearchForm from '@/components/movies/search-form';
import SearchPagination from '@/components/movies/search-pagination';
import { searchMovies } from '@/lib/data';
import { MovieSearchParams } from '@/lib/definitions/movie';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
  const pages = data?.total_pages;

  return (
    <>
      <section className="w-full text-center">
        <Suspense fallback={<div>Loading...</div>}>
          <MovieSearchForm />
        </Suspense>
      </section>
      <section className="w-full grow flex flex-col items-center justify-between gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="max-w-[80%] flex flex-wrap justify-center gap-8">
            {movies?.map((movie) => (
              <li
                className="max-w-[250px] text-center space-y-2"
                key={movie.id}
              >
                <div className="relative w-[250px] h-[375px]">
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={
                      movie.poster_path != null
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : `/poster-placeholder.png`
                    }
                    alt={`${movie.title} poster`}
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
                <p className="max-w-full">{movie.title}</p>
              </li>
            ))}
          </ul>
        </Suspense>
        {!movies?.length && (
          <Image
            src="/movie.png"
            alt="Movie"
            width={300}
            height={450}
            quality={100}
            priority
            unoptimized
          />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          {pages !== undefined && <SearchPagination totalPages={pages} />}
        </Suspense>
      </section>
    </>
  );
}
