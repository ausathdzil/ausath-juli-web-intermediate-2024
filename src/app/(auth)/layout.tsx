export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <article className="space-y-2 text-center font-serif pt-8">
        <h1 className="font-bold text-4xl text-primary">Critix</h1>
        <p className="text-xl">
          Read and write reviews for your favorite movies.
        </p>
      </article>
      {children}
    </>
  );
}
