import { findUser } from './findUser';
import { client } from '../db/index';
import { users } from 'drizzle/schema';
import { UserSave } from 'src/types/user';
export const saveUser = async ({ user }: { user: UserSave }) => {
  const isUserExist = await findUser({ sub: user.sub });
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
    await client.insert(users).values(userBody);
    const userToReturn = await findUser({ sub: userBody.sub });
    return userToReturn;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
