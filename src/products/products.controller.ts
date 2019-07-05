import { ProductsService } from './products.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createNewProduct(
    @Body('title') title: String,
    @Body('description') description: String,
    @Body('price') price: Number,
  ): Promise<Product> {
    return await this.productsService.create(title, description, price);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Get(':product_id')
  async getSingleProduct(@Param('product_id') id: String): Promise<Product> {
    return await this.productsService.get(id);
  }

  @Patch(':product_id')
  async updateSingleProduct(
    @Param('product_id') id: String,
    @Body('title') title: String,
    @Body('description') description: String,
    @Body('price') price: Number,
  ): Promise<Product> {
    return await this.productsService.update(id, title, description, price);
  }

  @Delete(':product_id')
  async deleteSingleProduct(@Param('product_id') id: String): Promise<Product> {
    return await this.productsService.delete(id);
  }
}
