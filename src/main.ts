// Libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

// Configurations
import { PipeValidatorConfig } from './configs';

// Main module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(PipeValidatorConfig));
  await app.listen(3000);
}
bootstrap();
