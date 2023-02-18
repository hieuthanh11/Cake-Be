import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Partial<Product>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        name: true,
        price: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const category = await this.prisma.category.findFirst({
      where: { id: data.category.connect.id },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ${data.category.connect.id} does not exist.`,
      );
    }
    return await this.prisma.product.create({
      data: data,
    });
  }

  async getProductById(id: string): Promise<Product> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { data, where } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }
}
