import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNWJjOGE1NS1jZjdmLTQzYWYtODU0MC05MGI4YmM2MzVlNmEiLCJ1c2VybmFtZSI6Imx1Y2FzIiwiaWF0IjoxNzM5Mjc5Mjc4LCJleHAiOjE3MzkyODI4Nzh9.RWyL-dC1X_wECIqtJKpE01272fWTkkwUC_4rdpmGj0g',
    description: 'Token do usuário',
  })
  token: string;

  @ApiProperty({ example: 3600, description: 'Tempo de expiração do token' })
  expiresIn: number;
}

export class SignInDto {
  @ApiProperty({ example: 'lucasribeiro', description: 'Nome do usuário' })
  username: string;
  @ApiProperty({ example: '12345678', description: 'Senha do usuário' })
  password: string;
}
