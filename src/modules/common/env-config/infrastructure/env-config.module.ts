import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { EnvConfigProvider } from './env-config.provider';
import environmentConfig from './environment.config';
import { IEnvConfigProvider } from '../application/providers/env-config-provider.interface';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IEnvConfigProvider,
      useClass: EnvConfigProvider,
    },
  ],
  exports: [IEnvConfigProvider],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return super.forRoot({
      load: [environmentConfig],
      isGlobal: true,
      ...options,
    });
  }
}
