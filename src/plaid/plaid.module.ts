import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';

@Module({
  providers: [PlaidService],
  controllers: [PlaidController],
})
export class PlaidModule {}
