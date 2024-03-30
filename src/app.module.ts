import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import environment from './config/environment.config';
import { JwtModule } from './modules/common/jwt/jwt.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [environment], isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.host'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    JwtModule,
    UsersModule,
  ],
})
export class AppModule {}
