import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller('plaid')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}

  @Get('/create-link-token/:userId')
  async createLinkToken(@Param('userId') userId: string) {
    return await this.plaidService.createLinkToken(userId);
  }

  @Post('/exchange-public-token')
  async exchangePublicToken(@Body('public_token') publicToken: string) {
    return await this.plaidService.exchangePublicToken(publicToken);
  }
}
