import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders/orders.controller';
import { OrderDetail } from './orders-detail/order-detail.entity';
import { OrderStatusLog } from './orders-status-log/order-status-history.entity';
import { Order } from './orders/orders.entity';
import { OrdersService } from './orders/orders.service';
import { OrdersDetailService } from './orders-detail/orders-detail.service';
import { OrdersStatusLogService } from './orders-status-log/orders-status-log.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, OrderStatusLog]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersDetailService, OrdersStatusLogService],
  exports: [],
})
export class OrdersModule {}
