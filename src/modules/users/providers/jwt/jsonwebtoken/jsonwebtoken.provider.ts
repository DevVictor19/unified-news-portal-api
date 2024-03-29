import { sign, verify } from 'jsonwebtoken';

import {
  IJwtProvider,
  TokenSignOptions,
  JwtPayload,
} from '../jwt-provider.interface';

export class JsonWebTokenProvider implements IJwtProvider {
  constructor(private secretKey: string) {}

  sign({ payload, expiresIn }: TokenSignOptions): string {
    return sign(payload, this.secretKey, { expiresIn });
  }

  verify<T extends JwtPayload>(token: string): T | string | null {
    try {
      return verify(token, this.secretKey) as T;
    } catch {
      return null;
    }
  }
}
