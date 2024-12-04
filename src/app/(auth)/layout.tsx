export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="my-8 sm:my-16 space-y-8 px-8">
      <article className="space-y-2 text-center font-serif">
        <h1 className="font-bold text-4xl text-primary">Critix</h1>
        <p className="text-xl">
          Read and write reviews for your favorite movies.
        </p>
      </article>
      {children}
    </div>
  );
}
