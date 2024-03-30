import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JsonWebTokenProvider } from './providers/jwt/jsonwebtoken/jsonwebtoken.provider';

import { PROVIDERS } from '@/common/enums/providers.enum';

@Global()
@Module({
  providers: [
    {
      provide: PROVIDERS.JWT,
      useFactory: (configService: ConfigService) => {
        return new JsonWebTokenProvider(
          configService.getOrThrow<string>('server.secret_key'),
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [PROVIDERS.JWT],
})
export class JwtModule {}
