import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterProductsDTO } from './products.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  findAll(params: FilterProductsDTO) {
    const { category, limit, offset } = params;
    if (limit && offset) {
      return this.productRepo.find({
        where: { flag: true, category },
        relations: ['ingredients'],
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      where: { flag: true, category },
      relations: ['ingredients'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { flag: true, id },
      relations: [],
    });

    if (!product) {
      throw new NotFoundException(`Producto no encontrado`);
    }

    return product;
  }

  async getPriceByProductId(productId: number): Promise<number> {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    return parseFloat(product.price.toString());
  }
}
