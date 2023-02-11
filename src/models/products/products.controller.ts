import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { CreateProduct } from './dto/create-product.dto';
import { ProductsService } from './products.service';
@ApiBearerAuth()
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getPublishedPosts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Roles(Role.Admin)
  @Post()
  async createProduct(@Body() createProduct: CreateProduct): Promise<Product> {
    return this.productService.create(createProduct);
  }
}
