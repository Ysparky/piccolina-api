import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderStatusDTO } from './order-status-history.dto';
import { OrderStatusLog } from './order-status-history.entity';

@Injectable()
export class OrdersStatusLogService {
  constructor(
    @InjectRepository(OrderStatusLog)
    private readonly statusLogRepo: Repository<OrderStatusLog>,
  ) {}

  async create({ order, status }: CreateOrderStatusDTO): Promise<void> {
    const created = this.statusLogRepo.create({
      order: { id: order },
      status,
    });
    await this.statusLogRepo.save(created);
  }
}
