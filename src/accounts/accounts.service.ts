import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from './accounts.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountRepository: Repository<Accounts>,
  ) {}

  async create(accounts: Accounts[]) {
    try {
      return this.accountRepository.upsert(accounts, ['account_id']);
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<Accounts[]> {
    try {
      return await this.accountRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<Accounts> {
    try {
      const account = await this.accountRepository.findOne({
        where: {
          id,
        },
      });
      if (!account) {
        throw new NotFoundException(`Account with ID ${id} not found`);
      }
      return account;
    } catch (error) {
      return error;
    }
  }
}
