import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: string;
  @ApiProperty({ example: 'lucasribeiro', description: 'Nome do usuário' })
  username: string;
  @ApiProperty({ example: '12345678', description: 'Senha do usuário' })
  password: string;
}
