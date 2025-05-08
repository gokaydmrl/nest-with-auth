import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { client } from '../db/index';
import { users } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import { UserSave } from 'src/types/user';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization?.split(' ')[1] ?? '';

    if (!token) {
      return false;
    }

    const SIGNING_KEY = process.env.SIGNING_KEY ?? '';

    const verifiedToken = verify(token, SIGNING_KEY, {
      algorithms: ['RS256'],
    });

    const sub =
      verifiedToken &&
      verifiedToken.sub &&
      typeof verifiedToken.sub === 'string'
        ? verifiedToken.sub
        : '';

    const user = await client
      .select()
      .from(users)
      .where(eq(users.sub, sub))
      .limit(1);
    if (!user || user.length === 0) {
      return false;
    }

    request.user = user[0] satisfies UserSave;

    return true;
  }
}
