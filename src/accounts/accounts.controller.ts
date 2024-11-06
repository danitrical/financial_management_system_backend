import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountsDto } from './accounts.dto';
import { Accounts } from './accounts.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountsDto[]): Promise<Accounts> {
    return this.accountService.create(createAccountDto as Accounts[]);
  }

  @Get()
  findAll(): Promise<Accounts[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Accounts> {
    return this.accountService.findOne(id);
  }
}
