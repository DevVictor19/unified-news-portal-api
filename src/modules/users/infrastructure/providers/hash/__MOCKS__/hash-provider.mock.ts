/* eslint-disable @typescript-eslint/no-unused-vars */

import { IHashProvider } from '@/modules/users/application/providers/hash-provider.interface';

export class HashProviderMock implements IHashProvider {
  async compareHash(payload: string, hash: string): Promise<boolean> {
    return payload === hash;
  }

  async generateHash(payload: string): Promise<string> {
    return 'hash';
  }
}
