import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { verifySession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, session.userId as string));

  const user = data[0];

  return user;
});
