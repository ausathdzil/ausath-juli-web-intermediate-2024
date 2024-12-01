import MovieReviewForm from '@/components/movies/review-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMovie } from '@/lib/data';
import { getMovieReviews } from '@/lib/db/data';
import { Review, ReviewWithUserName } from '@/lib/db/schema';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type MoviePageProps = {
  params: Promise<{ movieId: number }>;
};

export default function Page(props: MoviePageProps) {
  return (
    <div className="max-w-[80%] space-y-8">
      <Suspense fallback={<div>Loading...</div>}>
        <MovieDetail params={props.params} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieReviews params={props.params} />
      </Suspense>
    </div>
  );
}

async function MovieDetail(props: MoviePageProps) {
  const { movieId } = await props.params;
  const movie = await getMovie(movieId);

  if (!movie || movie.success === false) {
    notFound();
  }

  return (
    <section className="flex items-start gap-12 w-full">
      <div className="relative min-w-[350px] h-[550px]">
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
      <article className="flex flex-col gap-4">
        <h1 className="font-bold font-serif text-4xl text-primary">
          {movie.title}
        </h1>
        <em className="text-muted-foreground">{movie.tagline}</em>
        <ul className="space-x-4">
          {movie.genres.map((genre) => (
            <Badge
              key={genre.id}
              className="w-fit border-primary"
              variant="outline"
            >
              {genre.name}
            </Badge>
          ))}
        </ul>
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
          <span className="group-hover:underline underline-offset-2">
            More info
          </span>
        </a>
      </article>
    </section>
  );
}

async function MovieReviews(props: MoviePageProps) {
  const { movieId } = await props.params;
  const reviews = await getMovieReviews(movieId);

  return (
    <section className="flex justify-between gap-8">
      <div className="space-y-4 w-1/2">
        <h1>Reviews</h1>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <MovieReviewForm movieId={movieId} />
    </section>
  );
}

function ReviewCard({ review }: { review: ReviewWithUserName }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 gap-3">
        <Avatar>
          <AvatarFallback>{review.userName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-sm">{review.userName}</CardTitle>
          <CardDescription className="text-muted-foreground space-x-2">
            <span>
              {new Date(review.createdAt).toLocaleDateString('en-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="text-primary">&bull;</span>
            <span>⭐ {review.rating}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{review.content}</p>
      </CardContent>
    </Card>
  );
}
