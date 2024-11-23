import { MigrationInterface, QueryRunner } from 'typeorm';

export class Balances1732247737818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    mask CHAR(4) NOT NULL,
    type VARCHAR(50) NOT NULL,
    subtype VARCHAR(50) NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    institution_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);

    await queryRunner.query(`CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    account_id UUID NOT NULL,                      
    transaction_id VARCHAR(255) NOT NULL UNIQUE,   
    amount DECIMAL(18, 2) NOT NULL,                
    currency VARCHAR(3) NOT NULL,                  
    description TEXT,                              
    date DATE NOT NULL,                            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_account_id FOREIGN KEY (account_id) REFERENCES account(id)
);
`);

    await queryRunner.query(`CREATE TABLE balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id VARCHAR(255) NOT NULL,
    available_balance DECIMAL(18, 2),
    current_balance DECIMAL(18, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    CONSTRAINT fk_balances_account FOREIGN KEY (account_id) REFERENCES account(account_id)
);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE balances;`);
    await queryRunner.query(`DROP TABLE transactions;`);
    await queryRunner.query(`DROP TABLE account`);
  }
}
