import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/db.module';
import { PlaidService } from './plaid/plaid.service';
import { PlaidController } from './plaid/plaid.controller';
import { PlaidModule } from './plaid/plaid.module';
import { Balance } from './plaid/plaid.entity.balance';
import { Account } from './accounts/accounts.entity';
import { Transactions } from './plaid/plaid.entity.transaction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  controllers: [AppController, PlaidController],
  providers: [AppService, PlaidService],
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    PlaidModule,
    TypeOrmModule.forFeature([Users, Balance, Account, Transactions]),
    TransactionsModule,
    AccountsModule,
  ],
})
export class AppModule {}
