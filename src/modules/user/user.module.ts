import { Module } from '@nestjs/common';
import { SaveUserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from '../database/db.service';

@Module({
  controllers: [SaveUserController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
