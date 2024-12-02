import { LogoutButton } from '@/components/auth/logout-button';
import ProfileSkeleton from '@/components/skeletons/profile-skeleton';
import UserReviewSkeleton from '@/components/skeletons/user-review-skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getMovie } from '@/lib/data';
import { getUser, getUserReviews } from '@/lib/db/data';
import { Review } from '@/lib/db/schema';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <section className="w-full max-w-xl flex flex-col items-center gap-4">
        <h1 className="font-bold font-serif text-3xl text-center">Profile</h1>
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileSection />
        </Suspense>
      </section>
      <section className="w-full flex flex-col items-center gap-8">
        <h1 className="font-bold font-serif text-2xl text-center">
          My Reviews
        </h1>
        <Suspense fallback={<UserReviewSkeleton />}>
          <UserReviews />
        </Suspense>
      </section>
    </>
  );
}

async function ProfileSection() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="border rounded-lg shadow-sm p-4 w-fit mx-auto space-y-4">
      <div className="flex items-center justify-center gap-4 ">
        <Avatar>
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p>{user.name}</p>
          <p className="text-sm text-muted-foreground">
            Member since{' '}
            {new Date(user.createdAt).toLocaleDateString('en-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Link href="/profile/edit">
          <Button variant="outline">Edit Profile</Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
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
        <ul className="flex gap-4 flex-wrap justify-center">
          {reviews.map((review, i) => (
            <li key={i}>
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
    <div className="border rounded-lg shadow-sm p-4 mx-auto space-y-1 w-[400px] h-full">
      <Link href={`/movies/${review.movieId}`} className="font-bold text-lg">
        {movie.title}
      </Link>
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
      <p>{review.content}</p>
    </div>
  );
}
