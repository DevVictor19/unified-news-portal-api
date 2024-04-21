/* eslint-disable @typescript-eslint/no-unused-vars */

import { JwtPayload } from 'jsonwebtoken';

import {
  IJwtProvider,
  TokenSignOptions,
} from '../../application/providers/jwt-provider.interface';

export class JwtProviderMock implements IJwtProvider {
  sign({ payload, expiresIn }: TokenSignOptions): string {
    return 'token';
  }

  verify<T extends JwtPayload>(token: string): string | T | null {
    return {
      key: 'test key',
      iss: 'issuer',
      sub: 'subject',
      aud: 'audience',
      exp: 1672531200, // Exemplo de timestamp UNIX para 01/01/2023 00:00:00 GMT
      nbf: 1672455600, // Exemplo de timestamp UNIX para 31/12/2022 00:00:00 GMT
      iat: 1672396800, // Exemplo de timestamp UNIX para 30/12/2022 08:00:00 GMT
      jti: 'jwt_token_id',
    } as any;
  }
}
