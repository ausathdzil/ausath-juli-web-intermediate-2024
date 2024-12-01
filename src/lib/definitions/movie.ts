import { z } from 'zod';

export type Movie = {
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  success?: boolean;
};

export type MovieResult = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieSearchParams = {
  query: string;
  page?: number;
};

export const MovieReviewFormSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, { message: 'Please select your rating' })
    .max(10),
  content: z.string().min(1, { message: 'Please enter your review.' }).trim(),
  movieId: z.number().int(),
});

export type MovieReviewFormState =
  | {
      errors?: {
        rating?: string[];
        content?: string[];
      };
      message?: string;
    }
  | undefined;
