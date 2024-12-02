import { LogoutButton } from '@/components/auth/logout-button';
import SidebarNav from '@/components/layout/sidebar-nav';
import ProfileSkeleton from '@/components/skeletons/profile-skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUser } from '@/lib/db/data';
import { Suspense } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex-1 flex max-w-6xl w-full">
      <aside className="w-fit py-8 pr-8 flex flex-col items-start border-r gap-2">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileCard />
        </Suspense>
        <SidebarNav />
        <LogoutButton />
      </aside>
      <section className="flex-1 p-8 space-y-8">{children}</section>
    </div>
  );
}

async function ProfileCard() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="border rounded-lg shadow-sm p-3 w-full space-y-4">
      <div className="flex items-center justify-center gap-4 ">
        <Avatar>
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p>{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
