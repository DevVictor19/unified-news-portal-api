import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ApplicationErrorsFilter } from './common/infrastructure/nest/exception-filters/application-errors.filter';
import { initSwaggerConfig } from './config/init-swagger-config';
import { IEnvConfigProvider } from './modules/common/env-config/application/providers/env-config-provider.interface';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  initSwaggerConfig(app);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ApplicationErrorsFilter());

  const envConfigProvider = app.get(IEnvConfigProvider);
  const port = envConfigProvider.getServerPort();
  await app.listen(port, '0.0.0.0');
}
bootstrap();
