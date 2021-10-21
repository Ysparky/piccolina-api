import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './models/users/users.module';
import { TablesModule } from './models/tables/tables.module';
import { BookingTablesModule } from './models/booking-tables/booking-tables.module';
import { IngredientsModule } from './models/ingredients/ingredients.module';
import { ItemsModule } from './models/items/items.module';
import { RecipesModule } from './models/recipes/recipes.module';
import { MenusModule } from './models/menus/menus.module';
import { MenuItemModule } from './models/menu-item/menu-item.module';
import { OrdersModule } from './models/orders/orders.module';
import { OrderItemModule } from './models/order-item/order-item.module';

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
