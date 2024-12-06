import EditReviewForm from '@/components/movies/edit-review-form';
import UserReviewSkeleton from '@/components/skeletons/user-review-skeleton';
import { getMovie } from '@/lib/data';
import { getReviewById } from '@/lib/db/data';
import Link from 'next/link';
import { Suspense } from 'react';

type ReviewPageProps = {
  params: Promise<{ reviewId: string }>;
};

export default function Page(props: ReviewPageProps) {
  return (
    <>
      <h1 className="font-bold font-serif text-2xl">Edit Review</h1>
      <Suspense fallback={<UserReviewSkeleton />}>
        <Review params={props.params} />
      </Suspense>
    </>
  );
}

async function Review(props: ReviewPageProps) {
  const { reviewId } = await props.params;
  const review = await getReviewById(reviewId);
  const movie = await getMovie(review.movieId);

  return (
    <>
      <h1 className="text-lg font-serif">
        Update your review for:
        <Link href={`/movies/${movie?.id}`} className="text-primary font-bold">
          {' '}
          {movie?.title}
        </Link>
      </h1>
      <EditReviewForm
        reviewId={reviewId}
        rating={review.rating}
        content={review.content}
      />
    </>
  );
}
