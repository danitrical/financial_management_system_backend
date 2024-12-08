import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './transactions.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('create')
  async createTransaction(@Body() body: TransactionDto) {
    return await this.transactionService.processTransaction(body);
  }
}
