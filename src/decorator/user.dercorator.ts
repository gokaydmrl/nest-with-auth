import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserSave } from 'src/types/user';

// Extend the Request interface to include the user property
declare module 'express' {
  export interface Request {
    user?: UserSave;
  }
}
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);

export type User = UserSave;
