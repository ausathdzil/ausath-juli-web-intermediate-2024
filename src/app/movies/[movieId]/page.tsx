import { getMovie } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type MoviePageProps = {
  params: Promise<{ movieId: string }>;
};

export default function Page(props: MoviePageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDetail params={props.params} />
    </Suspense>
  );
}

async function MovieDetail(props: MoviePageProps) {
  const { movieId } = await props.params;
  const movie = await getMovie(movieId);

  if (!movie || movie.success === false) {
    notFound();
  }

  return (
    <div className="flex items-start justify-center gap-12">
      <div className="relative w-[350px] h-[500px]">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={
            movie.poster_path != null
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `/poster-placeholder.png`
          }
          alt={`${movie.title} poster`}
          className="rounded-lg object-cover shadow"
          fill
        />
      </div>
      <article className="flex flex-col gap-4 max-w-[40%]">
        <h1 className="font-bold font-serif text-4xl text-primary">
          {movie.title}
        </h1>
        <em className="text-muted-foreground">{movie.tagline}</em>
        <p>⭐ {movie.vote_average.toFixed(1)}</p>
        <p>{movie.overview}</p>
        <p>
          📅 Release Date:{' '}
          {new Date(movie.release_date).toLocaleDateString('en-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p>🕒 Runtime: {movie.runtime} minutes</p>
        <a
          className="text-primary group"
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗{' '}
          <span className="group-hover:underline underline-offset-2">More info</span>
        </a>
      </article>
    </div>
  );
}
