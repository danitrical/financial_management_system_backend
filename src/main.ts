import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initiateSwagger } from './swagger/swagger';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:*',
    credentials: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Request received from port: ${req.socket.remotePort}`);
    next();
  });

  initiateSwagger(app);
  await app.listen(3000);
}
bootstrap();
