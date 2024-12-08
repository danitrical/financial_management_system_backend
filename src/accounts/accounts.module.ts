import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/plaid/plaid.entity.balance';
import { Transactions } from 'src/plaid/plaid.entity.transaction';
import { Account } from './accounts.entity';

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  imports: [TypeOrmModule.forFeature([Account, Balance, Transactions])],
})
export class AccountsModule {}
