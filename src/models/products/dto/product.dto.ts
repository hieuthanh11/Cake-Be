import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  categoryId: string;
}
