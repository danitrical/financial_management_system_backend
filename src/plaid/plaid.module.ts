import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaidService } from './plaid.service';

@Module({
  imports: [ConfigModule ],
  providers: [PlaidService],
  exports: [PlaidService],
})
export class PlaidModule {}
