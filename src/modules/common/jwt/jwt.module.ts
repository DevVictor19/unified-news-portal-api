import { Global, Module } from '@nestjs/common';

import { IJwtProvider } from './jwt-provider.interface';
import { JwtProvider } from './jwt.provider';
import { EnvConfigModule } from '../env-config/env-config.module';

@Global()
@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: IJwtProvider,
      useClass: JwtProvider,
    },
  ],
  exports: [IJwtProvider],
})
export class JwtModule {}
