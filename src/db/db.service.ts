import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getDbService() {
    return 'they are cats';
  }
}
