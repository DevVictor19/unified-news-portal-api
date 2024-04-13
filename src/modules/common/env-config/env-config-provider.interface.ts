export abstract class IEnvConfigProvider {
  abstract getServerUrl(): string;
  abstract getSecretKey(): string;
  abstract getServerPort(): number;
  abstract getDbHost(): string;
  abstract getMailEmail(): string;
  abstract getMailName(): string;
  abstract getMailPwd(): string;
}
