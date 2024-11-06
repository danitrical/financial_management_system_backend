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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_API_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, JwtStrategy, UsersService, PlaidService],
  controllers: [AuthController],
})
export class AuthModule {}
