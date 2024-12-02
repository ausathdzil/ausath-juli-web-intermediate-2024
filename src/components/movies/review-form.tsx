'use client';

import { useUser } from '@/components/auth/user-provider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { addMovieReview } from '@/lib/actions/movie';
import { Loader2, NotebookPen } from 'lucide-react';
import { startTransition, useActionState } from 'react';

export default function MovieReviewForm({ movieId }: { movieId: number }) {
  const user = useUser();
  const addMovieReviewWithId = addMovieReview.bind(null, user.id);

  const [state, action, pending] = useActionState(
    addMovieReviewWithId,
    undefined
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => action(new FormData(event.currentTarget)));
  };

  return (
    <form className="space-y-4 w-1/2" onSubmit={handleSubmit}>
      <h1 className="text-lg font-bold font-serif">Write your review</h1>

      <input type="hidden" name="movieId" value={movieId} />

      <div className="space-y-1">
        <Label htmlFor="rating">Rating</Label>
        <Select name="rating">
          <SelectTrigger>
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                ⭐ {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.rating && (
          <p className="text-destructive text-sm">{state.errors.rating[0]}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="content">Review</Label>
        <Textarea
          placeholder="What did you think of the movie?"
          name="content"
          id="content"
        />
        {state?.errors?.content && (
          <p className="text-destructive text-sm">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" /> : <NotebookPen />}
          <span>Submit</span>
        </Button>
      </div>

      {state?.message && <p className="text-primary">{state.message}</p>}
    </form>
  );
}
