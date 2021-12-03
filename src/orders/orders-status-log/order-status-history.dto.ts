import { OrderStatusEnum } from './order-status-history.entity';

export interface CreateOrderStatusDTO {
  readonly order: number;
  readonly status: OrderStatusEnum;
}
