import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(title: String, description: String, price: Number): Product {
    const newProduct = new Product(
      Math.random().toString(),
      title,
      description,
      price,
    );

    this.products.push(newProduct);
    return newProduct;
  }

  getAll(): Product[] {
    return this.products;
  }

  get(id: String): Product {
    const [product] = this.findProduct(id);
    return product;
  }

  update(
    id: String,
    title: String,
    description: String,
    price: Number,
  ): Product {
    const [product, productIndex] = this.findProduct(id);
    this.products[productIndex] = {
      ...product,
      ...{
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      },
    };
    return this.products[productIndex];
  }

  delete(id: String): Product {
    const [product, productIndex] = this.findProduct(id);
    this.products.splice(productIndex, 1);
    return product;
  }

  private findProduct(id: String): [Product, number] {
    const productIndex = this.products.findIndex(product => id === product.id);
    const product = this.products[productIndex];
    if (!product)
      throw new NotFoundException('Could not find any product with that ID');
    return [product, productIndex];
  }
}
