import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/db.module';
import { PlaidService } from './plaid/plaid.service';
import { PlaidController } from './plaid/plaid.controller';
import { PlaidModule } from './plaid/plaid.module';
import { AccountsModule } from './accounts/accounts.module';
import { Balance } from './plaid/plaid.entity.balance';
import { Account } from './plaid/plaid.entity.account';
import { Transactions } from './plaid/plaid.entity.transaction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Accounts } from './accounts/accounts.entity';

@Module({
  controllers: [AppController, PlaidController],
  providers: [AppService, PlaidService],
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    PlaidModule,
    AccountsModule,
    TypeOrmModule.forFeature([Users, Balance, Account, Transactions, Accounts]),
  ],
})
export class AppModule {}
