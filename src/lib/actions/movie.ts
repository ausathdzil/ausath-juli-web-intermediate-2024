'use server';

import { db } from '@/lib/db';
import { reviews } from '@/lib/db/schema';
import {
  MovieReviewFormSchema,
  MovieReviewFormState,
} from '@/lib/definitions/movie';
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

  const data = await db
    .insert(reviews)
    .values({
      userId,
      movieId,
      rating,
      content,
    })
    .onConflictDoNothing({ target: [reviews.userId, reviews.movieId] })
    .returning({ id: reviews.id });

  if (data.length === 0) {
    return {
      message: 'You have already reviewed this movie.',
    };
  }

  revalidateTag(`movieReviews`);
  revalidateTag(`userReviews`);
}
