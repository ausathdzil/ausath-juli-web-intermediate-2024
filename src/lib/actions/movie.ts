'use server';

import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import {
  MovieReviewFormSchema,
  MovieReviewFormState,
} from '@/lib/definitions/movie';
import { and, eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function addMovieReview(
  userId: string,
  state: MovieReviewFormState,
  formData: FormData
) {
  if (!userId) {
    return {
      message: 'You must be logged in to review a movie.',
    };
  }

  const validatedFields = MovieReviewFormSchema.safeParse({
    movieId: Number(formData.get('movieId')),
    rating: Number(formData.get('rating')),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { movieId, rating, content } = validatedFields.data;

  const existingReview = await db
    .select({
      id: reviews.id,
    })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.movieId, movieId)))
    .limit(1);

  if (existingReview.length > 0) {
    return {
      message: 'You have already reviewed this movie.',
    };
  }

  const data = await db
    .insert(reviews)
    .values({
      userId,
      movieId,
      rating,
      content,
    })
    .returning({
      id: reviews.id,
    });

  if (!data) {
    return {
      message: 'An error occurred while adding your review.',
    };
  }

  revalidateTag(`movieReviews`);
}
