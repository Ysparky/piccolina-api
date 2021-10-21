import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TablesModule } from './tables/tables.module';
import { BookingTablesModule } from './booking-tables/booking-tables.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ItemsModule } from './items/items.module';
import { RecipesModule } from './recipes/recipes.module';
import { MenusModule } from './menus/menus.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    TablesModule,
    BookingTablesModule,
    IngredientsModule,
    ItemsModule,
    RecipesModule,
    MenusModule,
    MenuItemModule,
    OrdersModule,
    OrderItemModule,
  ],
})
export class AppModule {}
