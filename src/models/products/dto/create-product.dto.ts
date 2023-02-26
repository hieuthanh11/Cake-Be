import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateProduct {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;
  @ApiProperty({ default: 10 })
  @IsNotEmpty()
  quantity: number;
}
