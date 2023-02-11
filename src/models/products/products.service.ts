import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduct } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  async create(createProduct: CreateProduct): Promise<Product> {
    const { description, name, price, categoryId } = createProduct;
    return await this.prisma.product.create({
      data: { name, price, categoryId, description },
    });
  }
}
