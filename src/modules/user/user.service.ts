import { Injectable } from '@nestjs/common';
import { UserSave } from '../../types/user';
import { saveUser } from '../../helpers/saveUser';
import { DatabaseService } from '../database/db.service';
import { users } from '../../../drizzle/schema';
@Injectable()
export class UserService {
  constructor(private readonly dbClient: DatabaseService) {}
  async getUser(): Promise<string> {
    const usersAll = await this.dbClient.client.select().from(users);
    console.log(usersAll);

    return 'this is user';
  }
  async saveUser(user: UserSave): Promise<UserSave | null> {
    console.log('user', user);
    const userToSave = await saveUser({ user, dbClient: this.dbClient });
    return userToSave;
  }
}
