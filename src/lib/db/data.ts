import { db } from '@/lib/db';
import { reviews, users } from '@/lib/db/schema';
import { verifySession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { unstable_cacheTag as cacheTag } from 'next/cache';
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
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.movieId, movieId));

  return movieReviews;
}

export async function getUserReviews(userId: string) {
  'use cache';

  cacheTag('userReviews');

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
    .where(eq(reviews.userId, userId));

  return userReviews;
}
