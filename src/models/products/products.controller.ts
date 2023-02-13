import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProduct } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ProductEntity } from './dto/product.dto';
import { UpdateProduct } from './dto/update-product.dto';
@ApiBearerAuth()
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async getProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async getDetailProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ${id} does not exist.`);
    }
    return product;
  }

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async createProduct(@Body() createProduct: CreateProduct): Promise<Product> {
    const { description, name, price, categoryId } = createProduct;
    return this.productService.create({
      name: name,
      description: description,
      price: price,
      category: { connect: { id: categoryId } },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ProductEntity })
  update(
    @Param('id') id: string,
    @Body() updateProduct: UpdateProduct,
  ): Promise<Product> {
    return this.productService.updateProduct({
      where: { id: id },
      data: updateProduct,
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<Product> {
    return this.productService.deletePost({ id: id });
  }
}
