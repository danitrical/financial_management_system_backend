import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initiateSwagger } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/config/globalException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initiateSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
