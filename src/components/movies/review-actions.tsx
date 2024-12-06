'use client';

import { Button } from '@/components/ui/button';
import { deleteMovieReview } from '@/lib/actions/movie';
import { Edit2, Loader2, Trash } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

export default function ReviewActions({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <Link href={`/profile/reviews/${reviewId}`}>
        <Button size="sm" variant="ghost">
          <Edit2 />
        </Button>
      </Link>
      <form
        action={() =>
          startTransition(() => deleteMovieReview(userId, reviewId))
        }
      >
        <Button size="sm" variant="ghost">
          {isPending ? <Loader2 className="animate-spin" /> : <Trash />}
        </Button>
      </form>
    </div>
  );
}
