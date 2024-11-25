'use client';

import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="px-8 py-4 border-b">
      <nav className="flex justify-between items-center">
        <Link
          className="font-serif font-bold text-primary text-2xl flex items-center"
          href="/"
        >
          <Film className="mr-2" />
          <span>Critix</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/movies">
            <Button
              className={pathname === '/movies' ? 'underline' : ''}
              variant="link"
            >
              Movies
            </Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
