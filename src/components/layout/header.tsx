import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="px-8 py-4 border-b">
      <nav className="flex items-center">
        <Link className="font-serif font-bold text-primary text-2xl" href="/">
          Critix
        </Link>
        <div className="grow text-right space-x-8">
          <Link href="/movies">Movies</Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
