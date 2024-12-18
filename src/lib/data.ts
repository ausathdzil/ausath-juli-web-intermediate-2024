'use cache';

import { Movie, MovieResult, MovieSearchParams } from '@/lib/definitions/movie';
import { unstable_cacheLife as cacheLife } from 'next/cache';

export async function searchMovies(
  searchParams: MovieSearchParams
): Promise<MovieResult | null> {
  const query = new URLSearchParams();
  
  cacheLife('days');

  if (searchParams.query) {
    query.append('query', searchParams.query);
  }

  if (searchParams.page) {
    query.append('page', searchParams.page.toString());
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?${query}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function discoverMovies(): Promise<MovieResult | null> {
  cacheLife('days');

  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getMovie(id: number): Promise<Movie | null> {
  cacheLife('days');

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getNowPlayingMovies(): Promise<Movie[] | null> {
  cacheLife('days');

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getPopularMovies(): Promise<Movie[] | null> {
  cacheLife('days');
  
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getTopRatedMovies(): Promise<Movie[] | null> {
  cacheLife('days');

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}

export async function getUpcomingMovies(): Promise<Movie[] | null> {
  cacheLife('days');

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    });
    const data = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
}
