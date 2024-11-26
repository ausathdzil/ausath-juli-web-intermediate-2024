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
