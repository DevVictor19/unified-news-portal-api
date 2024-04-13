import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvConfigProvider } from './env-config-provider.interface';

@Injectable()
export class EnvConfigProvider implements IEnvConfigProvider {
  constructor(private configService: ConfigService) {}

  getSecretKey(): string {
    return this.configService.getOrThrow('server.secret_key');
  }

  getServerUrl(): string {
    return this.configService.getOrThrow('server.url');
  }

  getDbHost(): string {
    return this.configService.getOrThrow('database.host');
  }

  getMailEmail(): string {
    return this.configService.getOrThrow('mail.email');
  }

  getMailName(): string {
    return this.configService.getOrThrow('mail.name');
  }

  getMailPwd(): string {
    return this.configService.getOrThrow('mail.password');
  }

  getServerPort(): number {
    return this.configService.getOrThrow('server.port');
  }
}
