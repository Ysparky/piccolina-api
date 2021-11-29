import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FilterProductsDTO } from './products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProductsByCategory(@Query() params: FilterProductsDTO) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  getProductById(@Param('productId', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
