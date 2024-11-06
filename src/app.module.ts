import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/db.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UsersModule, DatabaseModule],
})
export class AppModule {}
