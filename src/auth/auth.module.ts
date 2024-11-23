import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JWT_API_KEY } from 'src/config/config';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { PlaidService } from 'src/plaid/plaid.service';
import { Account } from 'src/plaid/plaid.entity.account';
import { Accounts } from 'src/accounts/accounts.entity';
import { Balance } from 'src/plaid/plaid.entity.balance';
import { Transactions } from 'src/plaid/plaid.entity.transaction';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_API_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Users, Account, Accounts, Balance, Transactions]),
  ],
  providers: [AuthService, JwtStrategy, UsersService, PlaidService],
  controllers: [AuthController],
})
export class AuthModule {}
