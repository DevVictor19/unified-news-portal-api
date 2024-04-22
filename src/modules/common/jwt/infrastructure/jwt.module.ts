import { Global, Module } from '@nestjs/common';

import { JwtProvider } from './jwt.provider';
import { EnvConfigModule } from '../../env-config/infrastructure/env-config.module';
import { IJwtProvider } from '../application/providers/jwt-provider.interface';

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
