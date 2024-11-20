import { Controller, Get, Post, Body } from '@nestjs/common';
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
  @ApiBody({ schema: { properties: { access_token: { type: 'string' } } } })
  async getTransaction(@Body('access_token') access_token: string) {
    const transactions = await this.plaidService.getTransaction(access_token);
    return transactions;
  }
}
