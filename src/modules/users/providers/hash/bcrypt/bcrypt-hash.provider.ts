import { compare, hash, genSalt } from 'bcrypt';

import { IHashProvider } from '../hash-provider.interface';

export class BcryptHashProvider implements IHashProvider {
  async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash);
  }

  async generateHash(payload: string): Promise<string> {
    const salt = await genSalt();
    return hash(payload, salt);
  }
}
