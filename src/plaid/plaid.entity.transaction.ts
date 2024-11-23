import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Account } from './plaid.entity.account';

@Entity('transactions')
export class Transactions {
  @PrimaryColumn({ name: 'transaction_id' })
  transaction_id: string;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'authorized_date', type: 'date' })
  authorized_date: Date;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'category_id' })
  category_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ name: 'merchant_entity_id' })
  merchant_entity_id: string;

  @Column({ name: 'merchant_name' })
  merchant_name: string;

  @Column({ name: 'payment_channel' })
  payment_channel: string;

  @Column({ name: 'transaction_type' })
  transaction_type: string;

  @Column({ name: 'account_id' })
  account_id: string;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
