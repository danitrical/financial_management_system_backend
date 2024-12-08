import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { Account } from '../accounts/accounts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './plaid.entity.balance';
import { Transactions } from './plaid.entity.transaction';

@Module({
  providers: [PlaidService],
  controllers: [PlaidController],
  imports: [TypeOrmModule.forFeature([Account, Balance, Transactions])],
})
export class PlaidModule {}
