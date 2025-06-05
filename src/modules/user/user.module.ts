import { Module } from '@nestjs/common';
import { SaveUserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from 'src/services/db.service';

@Module({
  controllers: [SaveUserController],
  providers: [UserService, DatabaseService],
})
export class UserModule {}
