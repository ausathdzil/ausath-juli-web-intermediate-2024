'use client';

import { Button } from '@/components/ui/button';
import { Cog, User2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 w-full mt-4">
      <Link href="/profile">
        <Button
          className="w-full flex items-center justify-start"
          variant={pathname === '/profile' ? 'secondary' : 'ghost'}
        >
          <User2 />
          <span>Profile</span>
        </Button>
      </Link>
      <Link href="/profile/settings">
        <Button
          className="w-full flex items-center justify-start"
          variant={pathname === '/profile/settings' ? 'secondary' : 'ghost'}
        >
          <Cog />
          <span>Settings</span>
        </Button>
      </Link>
    </nav>
  );
}
