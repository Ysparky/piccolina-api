import { Exclude } from 'class-transformer';
import { Product } from 'src/products/products/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity('orders_detail')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int4' })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, name: 'total_price' })
  totalPrice: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // TODO: Handle discount and offerts
}
