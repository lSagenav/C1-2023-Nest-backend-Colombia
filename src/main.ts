// Libraries
import { NestFactory } from '@nestjs/core';

// Main module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:3000',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
