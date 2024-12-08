import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async getAllAccounts(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return this.accountRepository.find({
      where: { user_id: userId },
    });
  }

  async getAccountByAccountId(accountId: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: { account_id: accountId },
    });
  }
}
