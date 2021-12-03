import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from '../users/favorites/favorites.entity';
import { Category } from './categories/categories.entity';
import { Ingredient } from './ingredients/ingredients.entity';
import { Review } from './reviews/reviews.entity';
import { Product } from './products/products.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Ingredient, Product, Favorite, Review]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
