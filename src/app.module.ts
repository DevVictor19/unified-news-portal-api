import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import environment from './config/environment.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [environment] })],
})
export class AppModule {}
