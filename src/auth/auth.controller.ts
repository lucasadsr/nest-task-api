import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, SignInDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Realiza o login no app' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    type: [AuthResponse],
  })
  async signin(@Body() signInBody: SignInDto): Promise<AuthResponse> {
    return await this.AuthService.signIn(signInBody);
  }
}
