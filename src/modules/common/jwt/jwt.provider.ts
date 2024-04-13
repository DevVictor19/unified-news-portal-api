import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import {
  IJwtProvider,
  JwtPayload,
  TokenSignOptions,
} from './jwt-provider.interface';
import { IEnvConfigProvider } from '../env-config/env-config-provider.interface';

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
