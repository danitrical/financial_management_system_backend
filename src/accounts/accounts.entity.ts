import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  account_id: string;

  @Column()
  name: string;

  @Column({ length: 4 })
  mask: string;

  @Column()
  type: string;

  @Column()
  subtype: string;

  @Column({ nullable: true })
  verification_status: string;

  @Column({ nullable: true })
  class_type: string;

  @Column()
  institution_name: string;

  @Column()
  institution_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
