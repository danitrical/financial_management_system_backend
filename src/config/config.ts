import 'dotenv/config';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ENV = process.env.ENVIRONMENT;
const RDS_CA_BUNDLE = './src/database/rds-ca-bundle.pem';

const ssl = ENV !== 'local' &&
  ENV !== 'test' && {
    ca: fs.readFileSync(RDS_CA_BUNDLE).toString(),
  };

console.log({ ssl, a: process.env['DB_HOSTNAME'] });

const DATABASECONFIG: TypeOrmModuleOptions = {
  host: process.env['DB_HOSTNAME'],
  port: Number(process.env['DB_PORT']),
  type: process.env['DB_TYPE'] as any,
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB'],
  migrationsRun: Boolean(process.env['DB_MIGRATION_RUN']),
  migrationsTableName: 'migrations',
  name: process.env['DB_NAME'],
  autoLoadEntities: Boolean(process.env['DB_AUTO_LOAD_ENTITIES']),
  synchronize: false,
  logging: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  // ssl: ssl,
  extra: {
    max: 20,
    query_timeout: 20000,
    statement_timeout: 222222,
    idle_in_transaction_session_timeout: 22222,
  },
};
const SWAGGER_CONFIG = {
  title: process.env['SWAGGER_TITLE'],
  description: process.env['SWAGGER_DESCRIPTION'],
  version: process.env['SWAGGER_VERSION'],
  tag: process.env['SWAGGER_TAG'],
};

const JWT_API_KEY = process.env['JWT_API_KEY'];

const PLAID_CONFIG = {
  plaidClientKey : process.env['PLAID_CLIENT_ID'],
  plaidSecretKey : process.env['PLAID_SECRET'],
  plaidEnv : process.env['PLAID_ENV'],
  plaidProducts : process.env['PLAID_PRODUCTS'],
  plaidCountryCodes : process.env['PLAID_COUNTRY_CODES']
}
export { DATABASECONFIG, SWAGGER_CONFIG, JWT_API_KEY, PLAID_CONFIG };
