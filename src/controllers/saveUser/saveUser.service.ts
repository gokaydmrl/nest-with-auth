import { Injectable } from '@nestjs/common';
import { UserSave } from 'src/types/user';
import { saveUser } from 'src/helpers/saveUser';
import { DatabaseService } from 'src/services/db.service';
@Injectable()
export class SaveUserService {
  constructor(private readonly dbClient: DatabaseService) {}
  getUser(): string {
    return 'this is user';
  }
  async saveUser(user: UserSave): Promise<UserSave | null> {
    console.log('user', user);
    const userToSave = await saveUser({ user, dbClient: this.dbClient });
    return userToSave;
  }
}
