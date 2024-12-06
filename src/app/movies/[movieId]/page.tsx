import AddReviewForm from '@/components/movies/add-review-form';
import MovieDetailSkeleton from '@/components/skeletons/movie-detail-skeleton';
import MovieReviewSkeleton from '@/components/skeletons/movie-review-skeleton';
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
import { ReviewWithUserName } from '@/lib/db/schema';
import { verifySession } from '@/lib/session';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type MoviePageProps = {
  params: Promise<{ movieId: number }>;
};

export async function generateMetadata(
  props: MoviePageProps
): Promise<Metadata> {
  const { movieId } = await props.params;
  const movie = await getMovie(movieId);

  return {
    title: movie?.title,
    description: movie?.overview,
  };
}

export default function Page(props: MoviePageProps) {
  return (
    <div className="w-full max-w-[80%] space-y-8 py-8">
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetail params={props.params} />
      </Suspense>
      <Suspense fallback={<MovieReviewSkeleton />}>
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
    <section className="flex flex-col lg:flex-row items-center xl:items-start gap-8 lg:gap-12 w-full">
      <div className="relative w-[250px] h-[375px] lg:min-w-[400px] lg:h-[600px]">
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
        <h1 className="font-bold font-serif text-xl lg:text-4xl text-primary">
          {movie.title}
        </h1>
        <em className="text-muted-foreground">{movie.tagline}</em>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
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
  const session = await verifySession();

  return (
    <section className="flex flex-col sm:flex-row justify-start lg:justify-between gap-8">
      {session.isAuth ? (
        <AddReviewForm movieId={movieId} />
      ) : (
        <p className="text-left text-muted-foreground">
          <Link className="text-primary" href="/login">
            Login
          </Link>{' '}
          to review movies.
        </p>
      )}
      <div className="space-y-4 lg:w-1/2">
        <h1 className="text-lg font-bold font-serif">Reviews</h1>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet.</p>
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
    </section>
  );
}

type ReviewCardProps = {
  review: ReviewWithUserName;
};

function ReviewCard(props: ReviewCardProps) {
  const review = props.review;

  return (
    <Card>
      <CardHeader className="flex-row items-center space-y-0 gap-3">
        <Avatar>
          <AvatarFallback>{review.userName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-sm">{review.userName}</CardTitle>
          <CardDescription className="text-muted-foreground space-x-1 lg:space-x-2 text-xs lg:text-sm">
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
