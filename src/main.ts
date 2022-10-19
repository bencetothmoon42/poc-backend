import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api');

  setUp(app);

  await app.listen(3000);
}

bootstrap();
