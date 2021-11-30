import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './constants';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    UserModule,
    OrdersModule,
  ],
})
export class AppModule {}
