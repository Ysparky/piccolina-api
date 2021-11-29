import { Controller, Get, Query } from '@nestjs/common';
import { FilterProductsDTO } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProductsByCategory(@Query() params: FilterProductsDTO) {
    return this.productsService.findAll(params);
  }
}
