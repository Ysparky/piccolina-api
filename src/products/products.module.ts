import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/categories.entity';
import { Ingredient } from './ingredients/ingredients.entity';
import { Product } from './products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Ingredient, Product])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductsModule {}
