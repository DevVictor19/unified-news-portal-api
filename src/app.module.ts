import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
    }),
  ],
})
export class AppModule {}
