import MovieSearchForm from '@/components/movies/search-form';
import SearchPagination from '@/components/movies/search-pagination';
import SearchFormSkeleton from '@/components/skeletons/search-form-skeleton';
import SearchMovieSkeleton from '@/components/skeletons/search-movie-skeleton';
import { searchMovies } from '@/lib/data';
import { MovieSearchParams } from '@/lib/definitions/movie';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type SearchMoviePageProps = {
  searchParams: Promise<MovieSearchParams>;
};

export default function Page(props: SearchMoviePageProps) {
  return (
    <>
      <section className="w-full text-center pt-8">
        <Suspense fallback={<SearchFormSkeleton />}>
          <MovieSearchForm />
        </Suspense>
      </section>
      <section className="w-full grow flex flex-col items-center justify-between gap-8 pb-8">
        <Suspense fallback={<SearchMovieSkeleton />}>
          <SearchMovieItems searchParams={props.searchParams} />
        </Suspense>
      </section>
    </>
  );
}

async function SearchMovieItems(props: SearchMoviePageProps) {
  const { query, page } = await props.searchParams;
  const data = await searchMovies({ query, page });

  const movies = data?.results;
  const pages = data?.total_pages;

  return (
    <>
      <ul className="w-full max-w-[80%] flex flex-wrap justify-center gap-8">
        {movies?.map((movie) => (
          <li key={movie.id}>
            <Link
              className="max-w-[250px] text-center space-y-2"
              href={`/movies/${movie.id}`}
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
              <p className="max-w-[250px]">{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
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
      {pages !== undefined && <SearchPagination totalPages={pages} />}
    </>
  );
}
