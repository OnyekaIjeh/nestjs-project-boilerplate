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
  createNewProduct(
    @Body('title') title: String,
    @Body('description') description: String,
    @Body('price') price: Number,
  ): Product {
    return this.productsService.create(title, description, price);
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':product_id')
  getSingleProduct(@Param('product_id') id: String): Product {
    return this.productsService.get(id);
  }

  @Patch(':product_id')
  updateSingleProduct(
    @Param('product_id') id: String,
    @Body('title') title: String,
    @Body('description') description: String,
    @Body('price') price: Number,
  ): Product {
    return this.productsService.update(id, title, description, price);
  }

  @Delete(':product_id')
  deleteSingleProduct(@Param('product_id') id: String): Product {
    return this.productsService.delete(id);
  }
}
