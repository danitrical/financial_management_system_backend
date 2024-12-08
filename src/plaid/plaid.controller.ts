import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Get('link-token')
  async getLinkToken(user_id: string) {
    return { link_token: await this.plaidService.createLinkToken(user_id) };
  }

  @Post('exchange-token')
  @ApiBody({ schema: { properties: { public_token: { type: 'string' } } } })
  async exchangeToken(@Body('public_token') public_token: string) {
    const accessToken =
      await this.plaidService.exchangePublicToken(public_token);
    return { access_token: accessToken };
  }

  @Post('transactions')
  @ApiBody({
    schema: {
      properties: {
        access_token: { type: 'string' },
        userId: { type: 'number' },
      },
    },
  })
  async getTransaction(
    @Body('access_token') access_token: string,
    @Body('userId') userId: number,
  ) {
    try {
      const transactions = await this.plaidService.getTransaction(
        access_token,
        userId,
      );
      return transactions;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create balance',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('gets-balances/:user_id')
  async getBalances(@Param('user_id') user_id: number) {
    if (!user_id) {
      throw new BadRequestException('User ID is required');
    }
    await this.plaidService.getBalances(user_id);
    return await this.plaidService.getBalances(user_id);
  }

  @Get('gets-stored-transactions/:user_id')
  async getStoredTransactions(@Param('user_id') user_id: number) {
    if (!user_id) {
      throw new BadRequestException('User ID is required');
    }
    return await this.plaidService.getStoredTransactions(user_id);
  }
}
