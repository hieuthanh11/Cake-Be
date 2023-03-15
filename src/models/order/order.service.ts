import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderEnum } from 'src/enum/order.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountEntity } from '../accounts/dto/account.dto';
import {
  CreateOrderDto,
  CreateOrderDtoAnonymous,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  createAnonymous(createOrderDto: CreateOrderDtoAnonymous) {
    const { anonymous, products } = createOrderDto;

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          status: OrderEnum.Pending,
          dateOrder: new Date(),
          anonymous,
        },
      });
      for (const { id, quantity } of products) {
        const product = await tx.product.findFirstOrThrow({
          where: { id: id },
        });

        if (product.quantity < quantity) {
          throw new BadRequestException(
            `${product.name} not enough quantity sold ` + quantity,
          );
        }

        await Promise.all([
          tx.orderProduct.create({
            data: {
              quantity,
              order: { connect: { id: order.id } },
              product: { connect: { id: product.id } },
            },
          }),
          tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              quantity: product.quantity - quantity,
            },
          }),
        ]);
      }
      return 'Create order successfully';
    });
  }
  create(createOrderDto: CreateOrderDto, user: AccountEntity) {
    const { products } = createOrderDto;

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          status: OrderEnum.Pending,
          Account: { connect: { id: user.id } },
          dateOrder: new Date(),
        },
      });
      for (const { id, quantity } of products) {
        const product = await tx.product.findFirstOrThrow({
          where: { id: id },
        });

        if (product.quantity < quantity) {
          throw new BadRequestException(
            `${product.name} not enough quantity sold ` + quantity,
          );
        }

        await Promise.all([
          tx.orderProduct.create({
            data: {
              quantity,
              order: { connect: { id: order.id } },
              product: { connect: { id: product.id } },
            },
          }),
          tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              quantity: product.quantity - quantity,
            },
          }),
        ]);
      }
      return 'Create order successfully';
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { OrderProduct: { include: { product: true } }, Account: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
