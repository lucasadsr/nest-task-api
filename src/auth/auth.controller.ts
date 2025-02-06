import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signin(
    @Body('username') username: string,
    @Body('password') password: string,
  ): AuthResponse {
    return this.AuthService.signIn(username, password);
  }
}
