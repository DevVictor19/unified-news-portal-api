import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwaggerConfig(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('Unified News Portal')
    .setDescription(
      'An application designed to centralize the communication channel of a higher education institution.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
