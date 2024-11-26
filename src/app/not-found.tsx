import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full h-[300px] text-primary flex flex-col items-center justify-center gap-4">
      <Frown size={64} />
      <h1 className="text-4xl">404 - Page Not Found</h1>
    </div>
  );
}
