import { LogoutButton } from '@/components/auth/logout-button';
import { getUser } from '@/lib/db/data';

export default async function Page() {
  const user = await getUser();

  return (
    <>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <LogoutButton />
    </>
  );
}
