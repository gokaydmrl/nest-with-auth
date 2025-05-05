import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { decode } from 'jsonwebtoken';
// import { decode } from 'jsonwebtoken';
// import { client } from '../db/index';
// import { users } from '../../drizzle/schema';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const a = Number(req.url.split('/')[1]);
    // console.log('a', a);
    // if (a < 5) {
    //   console.log('Request next');
    //   next();
    //   return;
    // } else {
    //   console.log(req.params.userId);

    //   console.log('User not found');
    //   return res
    //     .status(401)
    //     .send({ success: false, message: 'param is bigger than 5' });
    // }
    // //  req.user = { id: 1, name: 'John Doasdasde' }; // Mock user data

    console.log('Request Middleware...');

    // const getToken = () => {
    //   const token =
    //     'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImF3YlJ1eDJhb1drc3ZRWTdaNFBDZyJ9.eyJpc3MiOiJodHRwczovL2Rldi11YWVmaDRqY2N1a2dzd3B5LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExNjgxOTYwODI3MTY4ODQzMTI2OCIsImF1ZCI6WyJodHRwczovL2Rldi11YWVmaDRqY2N1a2dzd3B5LnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtdWFlZmg0amNjdWtnc3dweS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzQ2MTI3Njk4LCJleHAiOjE3NDYyMTQwOTgsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSIsImF6cCI6IkJSZXlMRktSTHBJQlVXUUJXV0pFYUlRVFJSbTAzRmhjIn0.aJrJ5KWAhBxmSshhAwLt__VWJs2I-ASNoCBcvok_Hoyz4eHH0ZBCVVPz3AiE2MyAbVkLF1fT9MiVvzcdbc011jam3n1bKYtabaoc4HYEEaENlnVBfMDvzE9Jue9bpAftOiEybzLLnltMSmOvfjad3DbRp9NZm43PzrTqALIFj8orwnsmID1wP5z1z0o1kq5xGblB9BUTguCOu9ZexnNPSHI8WyVLyDd6LpmAJwzOwKoAfXpcsSUxTC6PccyRxbazkYZEEck7cF9rWV8O_dfTRrwK4QsUDrnOM-UKFLbKv81efBkVVnWmQ0jSHR5ciljCZ7VskZae37QwC94B_WPfhQ';
    //   const tokenThis = decode(token);
    //   console.log(tokenThis);
    // };
    // getToken();

    // const getData = async () => {
    //   try {
    //     const data = await client.select().from(users);
    //     console.log(data);
    //     return res.status(200).send({
    //       message: `You submitted the following data: gett`,
    //       data,
    //     });
    //   } catch (error) {
    //     console.log('error', error);
    //     return res.status(200).send({
    //       message: `You submitted the following data: gett`,
    //     });
    //   }
    // };

    // const postData = async () => {
    //   try {
    //     const data = await client.insert(users).values({
    //       email: 'gkymrl',
    //       nickname: 'gd',
    //       password: '123456',
    //       personalInfo: 'hello neon',
    //       profilePic: '',
    //       sub: 'asdfghjkl',
    //       username: 'guti',
    //     });
    //     console.log(data);
    //     return res.status(200).send({
    //       message: `You submitted the following data: gett`,
    //       data,
    //     });
    //   } catch (error) {
    //     console.log('error', error);
    //     return res.status(200).send({
    //       message: `You submitted the following data: gett`,
    //     });
    //   }
    // };

    // await getData();
    //    await postData();
    //  console.log('Req Headers.Authorization:', req.headers.authorization);
    // const decodedToken = decode(req.headers.authorization?.split(' ')[1] ?? '');
    // console.log('decodedToken', decodedToken);
    // const sub =
    //   decodedToken && typeof decodedToken.sub === 'string'
    //     ? decodedToken.sub
    //     : '';
    // console.log('req.user', req.user);

    // req.user.sub = sub;
    next();
  }
}
