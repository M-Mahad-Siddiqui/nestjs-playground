import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors() // allow all of them to request
  app.setGlobalPrefix('api')  // add prefix globally
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     bufferLogs: true,
//   });
//   app.useLogger(app.get(MyLoggerService)); // Use custom logger service
//   app.enableCors(); // allow all of them to request
//   app.setGlobalPrefix('api'); // add prefix globally
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
