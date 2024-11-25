import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <article className="text-primary flex flex-col items-center gap-4">
      <Frown size={64} />
      <h1 className="text-4xl">404 - Page Not Found</h1>
    </article>
  );
}
