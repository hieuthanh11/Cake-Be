import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PageOptionsDto } from 'src/base/base.filter';

export class QueryProductDto extends PageOptionsDto {
  @ApiProperty({ type: String, description: 'Name product', required: false })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Id category ',
    required: false,
  })
  category: string;
}

export interface ParamProduct {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
}
