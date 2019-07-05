import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly product: Model<Product>,
  ) {}

  async create(
    title: String,
    description: String,
    price: Number,
  ): Promise<Product> {
    let newProduct = new this.product({ title, description, price });
    newProduct = await newProduct.save();
    return newProduct;
  }

  async getAll(): Promise<Product[]> {
    return await this.product.find();
  }

  async get(id: String): Promise<Product> {
    const product = await this.findProduct(id);
    return product;
  }

  async update(
    id: String,
    title: String,
    description: String,
    price: Number,
  ): Promise<Product> {
    let product = await this.findProduct(id);

    title && (product.title = title);
    description && (product.description = description);
    price && (product.price = price);

    product = await product.save();
    return product;
  }

  async delete(id: String): Promise<Product> {
    let product = await this.findProduct(id);
    product = await product.remove();
    return product;
  }

  private async findProduct(id: String): Promise<Product> {
    let product;
    try {
      product = await this.product.findById(id);
      if (!product)
        throw new NotFoundException('Could not find any product with that ID');
    } catch (e) {
      throw new NotFoundException('Could not find any product with that ID');
    }
    return product;
  }
}
