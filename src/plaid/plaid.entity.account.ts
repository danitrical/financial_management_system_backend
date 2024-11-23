import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transactions } from './plaid.entity.transaction';
import { Balance } from './plaid.entity.balance';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  account_id: string;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column({ length: 4 })
  mask: string;

  @Column()
  type: string;

  @Column()
  subtype: string;

  @Column()
  institution_name: string;

  @Column()
  institution_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transactions, (transaction) => transaction.account)
  transactions: Transactions[];

  @OneToMany(() => Balance, (balance) => balance.account)
  balances: Balance[];
}
