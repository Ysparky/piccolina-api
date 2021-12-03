import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrderDetail } from './orders/order-detail.entity';
import { OrderStatusLog } from './orders/order-status-history.entity';
import { Order } from './orders/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, OrderStatusLog])],
  controllers: [OrdersController],
  providers: [],
  exports: [],
})
export class OrdersModule {}
