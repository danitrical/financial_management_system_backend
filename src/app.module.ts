import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/db.module';
import { PlaidService } from './plaid/plaid.service';
import { PlaidController } from './plaid/plaid.controller';
import { PlaidModule } from './plaid/plaid.module';

@Module({
  controllers: [AppController, PlaidController],
  providers: [AppService, PlaidService],
  imports: [AuthModule, UsersModule, DatabaseModule, PlaidModule],
})
export class AppModule {}
