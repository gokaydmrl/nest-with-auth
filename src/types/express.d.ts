interface IUser {
  id?: number;
  name?: string;
  sub: string;
}

declare namespace Express {
  export interface Request {
    user: IUser;
  }
}
