import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PageDto } from 'src/base/page.dto';
import { PageMetaDto } from 'src/base/page.meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParamProduct, QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll(
    params: ParamProduct,
    query: QueryProductDto,
  ): Promise<PageDto<Partial<Product>>> {
    const { skip, take, cursor, where, orderBy } = params;
    const entities = this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      // ...params,
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
    const count = this.prisma.product.count({ where: params.where });
    const [data, itemCount] = await Promise.all([entities, count]);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    return new PageDto(data, pageMetaDto);
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
