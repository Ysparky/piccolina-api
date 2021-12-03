import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products/products.service';
import { Repository } from 'typeorm';
import { CreateOrderDetailDTO } from '../orders-detail/order-detail.dto';
import { OrdersDetailService } from '../orders-detail/orders-detail.service';
import { OrderStatusEnum } from '../orders-status-log/order-status-history.entity';
import { OrdersStatusLogService } from '../orders-status-log/orders-status-log.service';
import { CreateOrderDTO, DetailDTO } from './orders.dto';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly ordersDetailService: OrdersDetailService,
    private readonly statusLogService: OrdersStatusLogService,
    private readonly productService: ProductsService,
  ) {}

  async create(
    customerId: number,
    { location, details }: CreateOrderDTO,
  ): Promise<void> {
    const { totalPrice, details: orderDetail } = await this.handleOrderPrices(
      details,
    );
    const created = this.ordersRepo.create({
      customer: { id: customerId },
      location: { id: location },
      totalPrice,
    });
    const { id: orderId } = await this.ordersRepo.save(created);
    await Promise.all([
      this.ordersDetailService.createByOrder(orderId, orderDetail),
      this.statusLogService.create({
        order: orderId,
        status: OrderStatusEnum.NEW,
      }),
    ]);
  }

  private async handleOrderPrices(data: DetailDTO[]) {
    let totalPrice: number = 0;
    let details: CreateOrderDetailDTO[] = [];
    for (const d of data) {
      const unitPrice = await this.productService.getPriceByProductId(
        d.product,
      );
      const price = d.quantity + unitPrice;
      totalPrice += price;
      details.push({
        ...d,
        totalPrice: price,
      });
    }

    return {
      totalPrice,
      details,
    };
  }
}
