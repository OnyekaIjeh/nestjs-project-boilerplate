import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel('Product') private readonly product: Model<Product>,
  ) {}

  async create(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    let newProduct = new this.product({ title, description, price });
    newProduct = await newProduct.save();
    return newProduct;
  }

  async getAll(): Promise<Product[]> {
    return await this.product.find();
  }

  async get(id: string): Promise<Product> {
    return await this.findProduct(id);
  }

  async update(
    id: string,
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    let product = await this.findProduct(id);

    title && (product.title = title);
    description && (product.description = description);
    price && (product.price = price);

    product = await product.save();
    return product;
  }

  async delete(id: string): Promise<Product> {
    let product = await this.findProduct(id);
    product = await product.remove();
    return product;
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.product.findById(id);
      if (!product) {
        throw new NotFoundException('Could not find any product with that ID');
      }
    } catch (e) {
      throw new NotFoundException('Could not find any product with that ID');
    }
    return product;
  }
}
