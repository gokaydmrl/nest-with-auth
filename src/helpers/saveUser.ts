import { findUser } from './findUser';
import { users } from '../../drizzle/schema';
import { UserSave } from 'src/types/user';
import { DatabaseService } from '../modules/database/db.service';
export const saveUser = async ({
  user,
  dbClient,
}: {
  user: UserSave;
  dbClient: DatabaseService;
}) => {
  const isUserExist = await findUser({ sub: user.sub, dbClient });
  try {
    if (isUserExist) {
      return null;
    }
    const userBody: UserSave = {
      sub: user.sub,
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      username: user.username,
    };
    await dbClient.client.insert(users).values(userBody);
    const userToReturn = await findUser({ sub: userBody.sub, dbClient });
    return userToReturn;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
