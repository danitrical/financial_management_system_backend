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
    try {
      return await this.accountRepository.query(
        'SELECT a.*, b.current_balance, b.available_balance FROM  account a LEFT JOIN balances b ON a.account_id = b.account_id',
      );
    } catch (err) {
      return err;
    }
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return await this.accountRepository.query(
      `SELECT a.*, b.current_balance, b.available_balance FROM  account a LEFT JOIN balances b ON a.account_id = b.account_id where user_id = ${userId}`,
    );
  }

  async getAccountByAccountId(accountId: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: { account_id: accountId },
    });
  }
}
