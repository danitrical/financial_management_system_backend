import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionsTable1732391882249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE transactions (
            transaction_id VARCHAR(255) PRIMARY KEY,
            user_id int, 
            account_id VARCHAR(255) NOT NULL,
            amount DECIMAL(18, 2),
            authorized_date DATE,                           
            currency VARCHAR(3) NOT NULL,
            category_id VARCHAR(15),
            category VARCHAR(50),
            merchant_entity_id VARCHAR(255),
            merchant_name VARCHAR(50),
            payment_channel VARCHAR(20),
            transaction_type VARCHAR(15),                            
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            name VARCHAR(50),
            CONSTRAINT fk_transaction_account_id FOREIGN KEY (account_id) REFERENCES account(account_id)
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE transactions`);
  }
}
