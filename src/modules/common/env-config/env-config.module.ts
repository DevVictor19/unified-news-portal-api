import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { IEnvConfigProvider } from './env-config-provider.interface';
import { EnvConfigProvider } from './env-config.provider';

import environmentConfig from '@/config/environment.config';

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
      ...options,
      load: [environmentConfig],
      isGlobal: true,
    });
  }
}
