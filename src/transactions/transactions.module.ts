import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/accounts.entity';
import { Balance } from 'src/plaid/plaid.entity.balance';
import { Transactions } from 'src/plaid/plaid.entity.transaction';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [TypeOrmModule.forFeature([Account, Balance, Transactions])],
})
export class TransactionsModule {}