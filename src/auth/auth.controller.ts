import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt_auth.guard';
import { UserDto } from 'src/users/users.dto';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthDto) {
    return await this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: UserDto) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
