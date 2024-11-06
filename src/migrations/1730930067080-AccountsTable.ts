import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountsTable1730930067080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE accounts (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                account_id VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                mask VARCHAR(4) NOT NULL,
                type VARCHAR(50) NOT NULL,
                subtype VARCHAR(50) NOT NULL,
                verification_status VARCHAR(50),
                class_type VARCHAR(50),
                institution_name VARCHAR(255) NOT NULL,
                institution_id VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE accounts;`);
  }
}
