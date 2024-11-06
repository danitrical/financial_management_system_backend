import { Injectable, OnModuleInit } from '@nestjs/common';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { PLAID_CONFIG } from 'src/config/config';

@Injectable()
export class PlaidService implements OnModuleInit {
  private plaidApiClient;
  constructor() {}

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

  async getTransaction(publicToken: string) {
    try {
      const response = await this.plaidApiClient.transactionsGet({
        public_token: publicToken,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}
