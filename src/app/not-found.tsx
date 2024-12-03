'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Frown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { back } = useRouter();

  return (
    <div className="flex-1 text-primary flex flex-col items-center justify-center gap-4">
      <Frown size={64} />
      <h1 className="text-4xl mb-4">404 - Page not found</h1>
      <Button onClick={() => back()}>
        <ArrowLeft />
        <span>Go back</span>
      </Button>
    </div>
  );
}
