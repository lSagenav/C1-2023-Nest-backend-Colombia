// Libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

// Configurations
import { PipeValidatorConfig } from './configs';

// Main module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
