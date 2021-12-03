import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailDTO } from './order-detail.dto';
import { OrderDetail } from './order-detail.entity';

@Injectable()
export class OrdersDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly detailRepo: Repository<OrderDetail>,
  ) {}

  async create(
    orderId: number,
    { product, quantity, totalPrice }: CreateOrderDetailDTO,
  ): Promise<void> {
    const created = this.detailRepo.create({
      product: { id: product },
      order: { id: orderId },
      quantity,
      totalPrice,
    });
    await this.detailRepo.save(created);
  }

  async createByOrder(orderId: number, data: CreateOrderDetailDTO[]) {
    for (const detailDTO of data) {
      await this.create(orderId, detailDTO);
    }
  }
}
