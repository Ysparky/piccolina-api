import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/users/favorites/favorites.entity';
import { Category } from './categories/categories.entity';
import { Ingredient } from './ingredients/ingredients.entity';
import { ProductsController } from './products/products.controller';
import { Product } from './products/products.entity';
import { ProductsService } from './products/products.service';
import { Review } from './reviews/reviews.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Ingredient, Product, Favorite, Review]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [],
})
export class ProductsModule {}
