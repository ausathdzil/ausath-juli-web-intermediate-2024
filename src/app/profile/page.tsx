import UserReviewSkeleton from '@/components/skeletons/user-review-skeleton';
import { getMovie } from '@/lib/data';
import { getUser, getUserReviews } from '@/lib/db/data';
import { Review } from '@/lib/db/schema';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <h1 className="font-bold font-serif text-2xl">My Reviews</h1>
      <Suspense fallback={<UserReviewSkeleton />}>
        <UserReviews />
      </Suspense>
    </>
  );
}

async function UserReviews() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const reviews = await getUserReviews(user?.id);

  return (
    <>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="flex gap-4 flex-wrap">
          {reviews.map((review, i) => (
            <li className="w-full" key={i}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

type ReviewItemProps = {
  review: Review;
};

async function ReviewItem(props: ReviewItemProps) {
  const review = props.review;
  const movie = await getMovie(review.movieId);

  if (!movie) {
    return null;
  }

  return (
    <Link href={`/movies/${review.movieId}`}>
      <div className="border rounded-lg shadow-sm p-4 mx-auto space-y-1 w-full xl:w-[800px] h-full hover:border-primary transition-colors">
        <p className="font-bold font-serif text-lg">{movie.title}</p>
        <div className="space-x-2 text-sm text-muted-foreground">
          <span>
            {new Date(review.createdAt).toLocaleDateString('en-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>&bull;</span>
          <span>⭐ {review.rating}</span>
        </div>
        <p className="text-sm xl:text-base">{review.content}</p>
      </div>
    </Link>
  );
}
