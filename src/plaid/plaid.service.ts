import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { PLAID_CONFIG } from 'src/config/config';
import { QueryFailedError, Repository, DataSource } from 'typeorm';
import { Account } from './plaid.entity.account';
import { Balance } from './plaid.entity.balance';
import { Transactions } from './plaid.entity.transaction';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaidService implements OnModuleInit {
  private plaidApiClient;
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
    private readonly dataSource: DataSource,
  ) {}

  onModuleInit() {
    this.initiateNewConnection();
  }

  initiateNewConnection() {
    this.plaidApiClient = new PlaidApi(
      new Configuration({
        basePath: PlaidEnvironments[PLAID_CONFIG.ENV],
        baseOptions: {
          headers: {
            'PLAID-CLIENT-ID': PLAID_CONFIG.ID,
            'PLAID-SECRET': PLAID_CONFIG.SECRET,
          },
        },
      }),
    );
  }

  async createLinkToken(user_id: string): Promise<{ linkToken: string }> {
    try {
      const response = await this.plaidApiClient.linkTokenCreate({
        user: { client_user_id: `${user_id}` || `unique-${Math.random()}` },
        client_name: 'penny-buddy',
        products: ['transactions'],
        country_codes: ['US'],
        language: 'en',
      });
      return response.data.link_token;
    } catch (error) {
      return error;
    }
  }

  async exchangePublicToken(publicToken: string) {
    try {
      const response = await this.plaidApiClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return { accessToken: response.data.access_token };
    } catch (error) {
      return error;
    }
  }

  async getTransaction(publicToken: string, userId: number) {
    try {
      const response = await this.plaidApiClient.transactionsGet({
        access_token: publicToken,
        start_date: '2023-04-14', // need to change will be taking from request Body
        end_date: '2024-04-17',
        options: {
          offset: 0,
        },
      });
      this.storeAccounts(userId, response.data);
      return JSON.stringify(response.data);
    } catch (error) {
      return error;
    }
  }

  async storeAccounts(userId: number, data: any): Promise<void> {
    const accountsData = data.accounts;
    const institutionName = data.item.institution_name;
    const institutionId = data.item.institution_id;

    for (const account of accountsData) {
      try {
        const accountEntity = this.accountRepository.create({
          account_id: account.account_id,
          user_id: userId,
          name: account.name,
          mask: account.mask,
          type: account.type,
          subtype: account.subtype,
          institution_name: institutionName,
          institution_id: institutionId,
        });

        await this.accountRepository.save(accountEntity);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          if ((error as any).code === '23505') {
            // error code for unique constraint
            throw new BadRequestException('Duplicate entry detected.');
          }
        }
        throw error;
      }

      try {
        const balanceEntity = this.balanceRepository.create({
          // account: savedAccount,
          available_balance: account.balances.available,
          current_balance: account.balances.current,
          currency: account.balances.iso_currency_code,
          account_id: account.account_id,
        });
        await this.balanceRepository.save(balanceEntity);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          if ((error as any).code === '23505') {
            // error code for unique constraint
            throw new BadRequestException('Duplicate entry detected.');
          }
        }
        throw error;
      }
    }
  }

  async getBalances(user_id: number) {
    const query = this.dataSource
      .getRepository(Balance)
      .createQueryBuilder('b')
      .innerJoin('account', 'a', 'b.account_id = a.account_id')
      .innerJoin('users', 'u', 'a.user_id = u.id')
      .where('u.id = :user_id', { user_id })
      .select([
        'b.available_balance',
        'b.current_balance',
        'b.currency',
        'a.type AS type',
        'a.subtype AS subtype',
        'u.id AS user_id',
        'u.first_name AS user_name',
        'a.institution_name AS institution',
      ]);
    return await query.getRawMany();
  }
}
