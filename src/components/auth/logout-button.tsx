'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth';
import { Loader2, LogOut } from 'lucide-react';
import { useTransition } from 'react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => logout());
      }}
    >
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="animate-spin mr-2" />
        ) : (
          <LogOut className="mr-2" />
        )}
        <span>Logout</span>
      </Button>
    </form>
  );
}
