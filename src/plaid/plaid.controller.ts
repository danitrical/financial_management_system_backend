import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Get('link-token')
  async getLinkToken(user_id: string) {
    return { link_token: await this.plaidService.createLinkToken(user_id) };
  }

  @Post('exchange-token')
  async exchangeToken(@Body('public_token') publicToken: string) {
    const accessToken =
      await this.plaidService.exchangePublicToken(publicToken);
    return { access_token: accessToken };
  }

  @Get('transactions')
  async getTransaction(@Body('access_token') accessToken: string) {
    const transactions = await this.plaidService.getTransaction(accessToken);
    return transactions;
  }
}
