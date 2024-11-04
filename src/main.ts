import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initiateSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initiateSwagger(app);
  await app.listen(3000);
}
bootstrap();
