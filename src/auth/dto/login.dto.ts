import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, default: 'user1' })
  username: string;

  @ApiProperty({ type: String, default: '123456' })
  password: string;
}
