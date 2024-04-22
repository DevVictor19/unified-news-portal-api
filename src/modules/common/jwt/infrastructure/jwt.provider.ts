import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { IEnvConfigProvider } from '../../env-config/application/providers/env-config-provider.interface';
import {
  IJwtProvider,
  TokenSignOptions,
} from '../application/providers/jwt-provider.interface';

@Injectable()
export class JwtProvider implements IJwtProvider {
  private secretKey: string;

  constructor(private envConfigProvider: IEnvConfigProvider) {
    this.secretKey = this.envConfigProvider.getSecretKey();
  }

  sign({ payload, expiresIn }: TokenSignOptions): string {
    return sign(payload, this.secretKey, { expiresIn });
  }

  verify<T extends JwtPayload>(token: string): string | T | null {
    try {
      return verify(token, this.secretKey) as T;
    } catch {
      return null;
    }
  }
}
