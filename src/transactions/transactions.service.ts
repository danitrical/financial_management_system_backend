import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/plaid/plaid.entity.balance';
import { Transactions } from 'src/plaid/plaid.entity.transaction';
import { Repository, In } from 'typeorm';
import { generateRandomUuid } from 'src/utils/uuid';
import { TransactionDto } from './transactions.dto';
import { AccountsService } from '../accounts/accounts.service';

enum AccountType {
  DEPOSITORY = 'depository',
  CREDIT = 'credit',
}

enum AccountSubtype {
  SAVINGS = 'savings',
  CHECKING = 'checking',
  CREDIT = 'credit',
}

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
    private accountService: AccountsService,
  ) {}

  async processTransaction(data: TransactionDto) {
    try {
      const { from_account, to_account_id, amount, user_id, category } = data;

      const balances = await this.balanceRepository.find({
        where: {
          account_id: In([from_account.accountId, to_account_id]),
        },
      });

      const balanceByAccountId: Record<string, Balance> = balances.reduce(
        (acc, account) => {
          acc[account.account_id] = account;
          return acc;
        },
        {},
      );

      const fromBalance: Balance = balanceByAccountId[from_account.accountId];
      const toBalance: Balance = balanceByAccountId[to_account_id];

      const to_account =
        await this.accountService.getAccountByAccountId(to_account_id);

      const isToCreditCard =
        to_account.type === AccountType.DEPOSITORY &&
        to_account.subtype === AccountSubtype.CREDIT;
      // Manage Balance
      if (fromBalance.available_balance > amount) {
        fromBalance.available_balance =
          Number(fromBalance.available_balance) - amount;
        fromBalance.current_balance =
          Number(fromBalance.current_balance) - amount; // Deduct from sender
        if (isToCreditCard) {
          toBalance.available_balance =
            Number(toBalance.available_balance) - amount; // Add to receiver
          toBalance.current_balance =
            Number(toBalance.current_balance) - amount; // Add to receiver
        } else {
          toBalance.available_balance =
            Number(toBalance.available_balance) + amount; // Add to receiver
          toBalance.current_balance =
            Number(toBalance.current_balance) + amount; // Add to receiver
        }

        await this.balanceRepository.save([fromBalance, toBalance]);
      } else {
        return {
          message: 'Not Enough Balance',
        };
      }

      const fromTransaction: Transactions = {
        account_id: from_account.accountId,
        amount: -amount,
        merchant_entity_id: to_account.account_id,
        authorized_date: new Date(),
        currency: 'USD',
        transaction_id: generateRandomUuid(),
        user_id: user_id,
        category: category,
      } as Transactions;
      const toTransaction: Transactions = {
        account_id: to_account.account_id,
        amount: amount,
        merchant_entity_id: from_account.accountId,
        authorized_date: new Date(),
        currency: 'USD',
        transaction_id: generateRandomUuid(),
        user_id: user_id,
        category: category,
      } as Transactions;
      await this.transactionRepository.save([fromTransaction, toTransaction]);

      return {
        message: 'Transaction processed successfully',
        data: {
          sender: from_account,
          receiver: to_account,
          status: 200,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
