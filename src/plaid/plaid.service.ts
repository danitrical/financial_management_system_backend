import { Injectable, Logger } from '@nestjs/common';
import { PLAID_CONFIG } from 'src/config/config';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';

@Injectable()
export class PlaidService {
  private readonly plaidClient: PlaidApi;

  constructor() {
    const clientId = PLAID_CONFIG['plaidClientKey']
    const secret = PLAID_CONFIG['plaidSecretKey'];
    const env = PLAID_CONFIG['plaidEnv'] || 'sandbox';
    const configuration = new Configuration({
      basePath: PlaidEnvironments[env],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': clientId,
          'PLAID-SECRET': secret,
        },
      },
    });
    this.plaidClient = new PlaidApi(configuration);
  }

  async createLinkToken(userId: string) {
    try {
      const response = await this.plaidClient.linkTokenCreate({
        user: { client_user_id: userId },
        client_name: 'PennyBuddy',
        products: ['auth'] as Products[],
        country_codes: ['US'] as CountryCode[],
        language: 'en',
      });
      console.log("Response :", response.data);
      return response.data;
    } catch (error) {
      Logger.error('Error creating link token', error);
      throw error;
    }
  }

  async exchangePublicToken(publicToken: string) {
    try {
      const response = await this.plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return response.data;
    } catch (error) {
      Logger.error('Error exchanging public token', error);
      throw error;
    }
  }
}
