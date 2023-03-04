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

  @ApiProperty({ type: String, default: new Date() })
  dateOrder: string;
  // @ApiProperty({ type: String })
  // anonymous: string;
}
