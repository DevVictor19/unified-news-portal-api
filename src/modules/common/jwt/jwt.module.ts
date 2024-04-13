import { Global, Module } from '@nestjs/common';

import { IJwtProvider } from './jwt-provider.interface';
import { JwtProvider } from './jwt.provider';

@Global()
@Module({
  providers: [
    {
      provide: IJwtProvider,
      useClass: JwtProvider,
    },
  ],
  exports: [IJwtProvider],
})
export class JwtModule {}
