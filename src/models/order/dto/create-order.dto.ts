import { ApiProperty } from '@nestjs/swagger';

export class ProductOrder {
  @ApiProperty({ type: String, default: '' })
  id: string;
  @ApiProperty({ type: Number, default: 10 })
  quantity: number;
}
export class CreateOrderDto {
  @ApiProperty({ type: [ProductOrder] })
  products: ProductOrder[];
}

export class CreateOrderDtoAnonymous extends CreateOrderDto {
  @ApiProperty({ type: String })
  anonymous: string;
}
