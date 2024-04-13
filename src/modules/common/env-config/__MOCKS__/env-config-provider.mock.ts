import { IEnvConfigProvider } from '../env-config-provider.interface';

export class EnvProviderMock implements IEnvConfigProvider {
  getDbHost(): string {
    return 'db host';
  }

  getMailEmail(): string {
    return 'mail email';
  }

  getMailName(): string {
    return 'mail name';
  }

  getMailPwd(): string {
    return 'mail password';
  }

  getSecretKey(): string {
    return 'server secret key';
  }

  getServerPort(): number {
    return 3030;
  }

  getServerUrl(): string {
    return 'server url';
  }
}
