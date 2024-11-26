import { getMovie } from '@/lib/data';
import { notFound } from 'next/navigation';

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page(props: MoviePageProps) {
  const { id } = await props.params;
  const movie = await getMovie(id);
  
  if (!movie) {
    notFound();
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}
