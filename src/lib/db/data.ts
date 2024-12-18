import { db } from '@/lib/db';
import { reviews, users } from '@/lib/db/schema';
import { verifySession } from '@/lib/session';
import { desc, eq } from 'drizzle-orm';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.userId as string));

  const user = data[0];

  return user;
});

export async function getMovieReviews(movieId: number) {
  'use cache';

  cacheTag('movieReviews');
  cacheLife('hours');

  const movieReviews = await db
    .select({
      id: reviews.id,
      movieId: reviews.movieId,
      userId: reviews.userId,
      rating: reviews.rating,
      content: reviews.content,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      userName: users.name,
    })
    .from(reviews)
    .orderBy(desc(reviews.createdAt))
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.movieId, movieId))
    .limit(10);

  return movieReviews;
}

export async function getUserReviews(userId: string) {
  'use cache';

  cacheTag('userReviews');
  cacheLife('hours');

  const userReviews = await db
    .select({
      id: reviews.id,
      movieId: reviews.movieId,
      userId: reviews.userId,
      rating: reviews.rating,
      content: reviews.content,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
    })
    .from(reviews)
    .orderBy(desc(reviews.createdAt))
    .where(eq(reviews.userId, userId))
    .limit(4);

  return userReviews;
}

export async function getReviewById(reviewId: string) {
  'use cache';

  cacheTag(`review-${reviewId}`);
  cacheLife('hours');

  const review = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  return review[0];
}
