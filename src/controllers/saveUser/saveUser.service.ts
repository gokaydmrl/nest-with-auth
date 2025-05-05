import { Injectable } from '@nestjs/common';
import { UserSave } from 'src/types/user';
import { saveUser } from 'src/helpers/saveUser';
@Injectable()
export class SaveUserService {
  getUser(): string {
    return 'this is user';
  }
  async saveUser(user: UserSave): Promise<UserSave | null> {
    console.log('user', user);
    const userToSave = await saveUser({ user });
    return userToSave;
  }
}
