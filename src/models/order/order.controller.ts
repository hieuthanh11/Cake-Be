import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  CreateOrderDtoAnonymous,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AccountEntity } from '../accounts/dto/account.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @User() user: AccountEntity) {
    return this.orderService.create(createOrderDto, user);
  }

  @Public()
  @Post('/anonymous')
  createAnonymous(@Body() createOrderDto: CreateOrderDtoAnonymous) {
    return this.orderService.createAnonymous(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
