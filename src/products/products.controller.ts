import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createNewProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<Product> {
    return await this.productsService.create(title, description, price);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAll();
  }

  @Get(':product_id')
  async getSingleProduct(@Param('product_id') id: string): Promise<Product> {
    return await this.productsService.get(id);
  }

  @Patch(':product_id')
  async updateSingleProduct(
    @Param('product_id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<Product> {
    return await this.productsService.update(id, title, description, price);
  }

  @Delete(':product_id')
  async deleteSingleProduct(@Param('product_id') id: string): Promise<Product> {
    return await this.productsService.delete(id);
  }
}
