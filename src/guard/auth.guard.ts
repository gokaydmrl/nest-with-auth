import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { decode } from 'jsonwebtoken';
import { client } from '../db/index';
import { users } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import { UserSave } from 'src/types/user';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    //  const token = request.headers.authorization?.split(' ')[1] ?? '';

    const decodedToken = decode(
      request.headers.authorization?.split(' ')[1] ?? '',
    );
    // console.log('decodedToken', decodedToken);

    //     const b = `-----BEGIN CERTIFICATE-----
    // MIIDHTCCAgWgAwIBAgIJD5pjAG91mu94MA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
    // BAMTIWRldi11YWVmaDRqY2N1a2dzd3B5LnVzLmF1dGgwLmNvbTAeFw0yNDEwMDcy
    // MDAzMDBaFw0zODA2MTYyMDAzMDBaMCwxKjAoBgNVBAMTIWRldi11YWVmaDRqY2N1
    // a2dzd3B5LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
    // ggEBAMgZxkc5PXXKHlGSrQ4W0KR3rdcUkjeuKLLPuGgG9dWrBKmDTcTAzXsvOspY
    // u0RFN5BpEUm2c0kft+v0oEOHJ6tLwAXBM0H1dAzB3Nb7eMBSlzkwWJF6eqITPcNl
    // rQOtZ+WF0ngjQnxccwUIBQiMx0n9e0RiNH+eXGtHzQPfpJsd43sW7oV1EkNXowvu
    // +irOp3Yme8OvnMQIrmdEvKlUH8eu7LyUH1aNYAPYDJSfWfiOPh1x3+iUlLdBvou6
    // 6kfAMCJrTocmDw88SHvt2pKYgJ2kUyGUAvcRD9jhA13m1BTtIWeQhNtsXwpG2281
    // oBX9pK6N2RJA6g8JAIk2SWGi82UCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
    // BgNVHQ4EFgQUkF+6Cim1TCjA76L52MqPxCkfIy0wDgYDVR0PAQH/BAQDAgKEMA0G
    // CSqGSIb3DQEBCwUAA4IBAQBNqgMo2lQcg+hcrX9jeiFQYBxPOorFePihHGk2NvR7
    // tR3xJf1NtJPUxJwJmEOzV9IQuPOYRTHUa5jfzsHltxu/M/SN3Ikk3KvVY8bANPwk
    // z82M5RSEwwWe+Z6wBcIjmq56ZM9GYEd25+SNqyLCtCdLvYOznIn76ati3N9vfmI/
    // vn84j3IknAAJzjiDA/mwf9Faj8WyJgkoHf4b3gV6Pj5bvi1e3akH+csMYH91wyWq
    // AnR3BXtb5oPzt/i7MllNEQv4fX3TFUfkrgKgQSIdYqVa44NgmRU+tgemPBWKBddq
    // O3xzq/A0fQVeid/ZykTCXyfQXSZWRNqxrMjMykK73shO
    // -----END CERTIFICATE-----`;

    // console.log(
    //   'Verified Token',
    //   verify(token, b, {
    //     algorithms: ['RS256'],
    //   }),
    // );

    // const sub =
    //   decodedToken && typeof decodedToken.sub === 'string'
    //     ? decodedToken.sub
    //     : null;
    // if (sub === null || sub === '') {
    //   return false;
    // }
    // request.user = {
    //   sub,
    // };
    const sub =
      decodedToken && decodedToken.sub && typeof decodedToken.sub === 'string'
        ? decodedToken.sub
        : '';
    const user = await client
      .select()
      .from(users)
      .where(eq(users.sub, sub))
      .limit(1);
    //  console.log('user guarddd', user);
    if (!user || user.length === 0) {
      return false;
    }
    //@ts-expect-error satisfies

    request.user = { sub: user[0].sub, ...user[0] } satisfies UserSave;

    return true;
  }
}
