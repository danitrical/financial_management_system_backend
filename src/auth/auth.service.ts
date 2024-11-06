import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { PlaidService } from 'src/plaid/plaid.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private plaidService: PlaidService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user?.password;
      return user;
    }
    return null;
  }

  async getJwtAccessToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async login(body: AuthDto) {
    try {
      const user = await this.validateUser(body.email, body.password);
      if (!user) {
        return { message: 'Invalid credentials' };
      }
      const accessToken = await this.getJwtAccessToken(user);
      const plaidAccessToken = await this.plaidService.createLinkToken(user.id);
      return {
        ...user,
        accessToken,
        plaidAccessToken,
      };
    } catch (error) {
      return error;
    }
  }

  async register(userData: any) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      return this.usersService.create({
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      return error;
    }
  }
}
