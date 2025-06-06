import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../modules/database/db.service';

export const findUser = async ({
  sub,
  dbClient,
}: {
  sub: string;
  dbClient: DatabaseService;
}) => {
  const user = await dbClient.client
    .select()
    .from(users)
    .where(eq(users.sub, sub))
    .limit(1);

  if (!user) {
    return null;
  }
  return user[0];
};
