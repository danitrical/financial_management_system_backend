import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Account } from './accounts.entity';

@ApiTags('accounts') // Swagger tag to group the routes
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all accounts' })
  @ApiResponse({
    status: 200,
    description: 'List of all accounts',
    type: [Account],
  })
  async getAllAccounts(): Promise<Account[]> {
    return this.accountService.getAllAccounts();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get accounts by user ID' })
  @ApiResponse({
    status: 200,
    description: 'List of accounts for a specific user',
    type: [Account],
  })
  async getAccountsByUserId(
    @Param('userId') userId: number,
  ): Promise<Account[]> {
    return this.accountService.getAccountsByUserId(userId);
  }

  @Get(':accountId')
  @ApiOperation({ summary: 'Get account by account ID' })
  @ApiResponse({
    status: 200,
    description: 'Account details for the specified account ID',
    type: Account,
  })
  async getAccountByAccountId(
    @Param('accountId') accountId: string,
  ): Promise<Account> {
    return this.accountService.getAccountByAccountId(accountId);
  }
}
