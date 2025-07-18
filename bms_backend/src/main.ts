import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // if using cookies
  });
    app.use(cookieParser()); 
    app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);

}
bootstrap();
