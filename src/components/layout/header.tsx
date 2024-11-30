import NavLinks from '@/components/layout/nav-links';
import { Film } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Header() {
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
          <Suspense fallback={<div>Loading...</div>}>
            <NavLinks />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
