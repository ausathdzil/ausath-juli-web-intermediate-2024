import { Input } from '@/components/ui/input';
import { discoverMovies } from '@/lib/data';
import { ArrowRight, Search } from 'lucide-react';
import Form from 'next/form';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <section className="space-y-8 text-center">
        <article className="font-serif space-y-2">
          <h1 className="font-bold text-4xl text-primary">
            Review your favorite movies
          </h1>
          <p className="text-lg">
            Critic your favorite movies and share your thoughts with the world.
          </p>
        </article>
        <SearchForm />
        <HomeMovies />
      </section>
    </>
  );
}

function SearchForm() {
  return (
    <Form className="w-3/4 mx-auto" action="/movies/search">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <Input
          id="query"
          name="query"
          className="peer pe-9 ps-9"
          placeholder="Search for a movie..."
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </Form>
  );
}

async function HomeMovies() {
  const data = await discoverMovies();
  const movies = data?.results.slice(0, 6);

  return (
    <section className="space-y-8">
      <h2 className="text-2xl">Popular Movies</h2>
      <ul className="grid grid-cols-3 gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          {movies?.map((movie) => (
            <li key={movie.id}>
              <figure className="text-center space-y-2">
                <Image
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  width={300}
                  height={500}
                />
                <figcaption>{movie.title}</figcaption>
              </figure>
            </li>
          ))}
        </Suspense>
      </ul>
    </section>
  );
}
