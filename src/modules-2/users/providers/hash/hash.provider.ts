import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

import { IHashProvider } from './hash-provider.interface';

@Injectable()
export class HashProvider implements IHashProvider {
  compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }

  async generateHash(payload: string): Promise<string> {
    const salt = await genSalt();
    return hash(payload, salt);
  }
}
