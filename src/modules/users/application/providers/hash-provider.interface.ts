export abstract class IHashProvider {
  abstract generateHash(payload: string): Promise<string>;
  abstract compareHash(payload: string, hash: string): Promise<boolean>;
}
