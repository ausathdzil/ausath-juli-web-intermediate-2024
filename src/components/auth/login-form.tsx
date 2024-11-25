'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/actions/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { startTransition, useActionState, useState } from 'react';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => action(new FormData(event.currentTarget)));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        {state?.errors?.email && (
          <p className="text-sm text-destructive">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            className="pe-9"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
        {state?.errors?.password && (
          <p className="text-sm text-destructive">{state.errors.password}</p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={pending}>
        {pending && <Loader2 className="animate-spin mr-2" />}
        <span>Login</span>
      </Button>

      {state?.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}
    </form>
  );
}
