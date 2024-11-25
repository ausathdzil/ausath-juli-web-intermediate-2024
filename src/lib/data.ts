import { MovieResult, MovieSearchParams } from '@/lib/definitions/movie';

export async function searchMovies(
  searchParams: MovieSearchParams
): Promise<MovieResult[] | null> {
  const query = new URLSearchParams();
  query.append('query', searchParams.query);
  if (searchParams.page) {
    query.append('page', searchParams.page.toString());
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3//api/search/movie?${query.toString()}`,
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