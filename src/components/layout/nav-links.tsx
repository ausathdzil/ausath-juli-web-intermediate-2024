'use client';

import { useUser } from '@/components/auth/user-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  const user = useUser();

  return (
    <>
      <Link className="hidden sm:block" href="/movies">
        <Button
          className={pathname === '/movies' ? 'underline' : ''}
          variant="link"
        >
          Movies
        </Button>
      </Link>
      {user ? (
        <div className="flex items-center gap-8">
          <p className="text-sm hidden sm:block">👋 Hey, {user.name}!</p>
          <Link href="/profile">
            <Button>Profile</Button>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <Button>Get Started</Button>
        </Link>
      )}
    </>
  );
}
