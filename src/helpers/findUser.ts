import { users } from 'drizzle/schema';
import { client } from '../db/index';
import { eq } from 'drizzle-orm';

export const findUser = async ({ sub }: { sub: string }) => {
  const user = await client
    .select()
    .from(users)
    .where(eq(users.sub, sub))
    .limit(1);

  if (!user) {
    return null;
  }
  return user[0];
};
