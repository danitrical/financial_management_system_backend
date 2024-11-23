import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from './plaid.entity.account';

@Entity('balances')
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'available_balance', type: 'decimal', nullable: true })
  available_balance: number;

  @Column({ name: 'current_balance', type: 'decimal' })
  current_balance: number;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'account_id' })
  account_id: string;

  @ManyToOne(() => Account, (account) => account.balances)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
