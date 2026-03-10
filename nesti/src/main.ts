import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import middleware1 from './middlers/middleware1';
import { middleware2 } from './middlers/middleware2';
import { HttpExceptionFilter } from './exception-filters/http-exception-filters';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(middleware1);
  app.use(middleware2);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
