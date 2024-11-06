import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts.entity';

@Module({
  providers: [AccountsService],
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountsController],
})
export class AccountsModule {}
