import { Exclude } from 'class-transformer';
import { Customer } from 'src/users/customers/customers.entity';
import { Location } from 'src/users/locations/locations.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { OrderStatusLog } from './order-status-history.entity';

export enum OrderStatus {
  NEW = 'NEW',
  CHECKOUT = 'CHECKOUT',
  PAID = 'PAID',
  FAILED = 'FAILED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  COMPLETE = 'COMPLETE',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 9, scale: 3, name: 'sub_total' })
  subTotal: number;

  // TODO: Handle tax
  //   @Column({ type: 'decimal', precision: 9, scale: 3 })
  //   tax: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, name: 'total_price' })
  totalPrice: number;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ default: true })
  flag: boolean;

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

  @OneToMany(() => OrderDetail, (orderItem) => orderItem.order)
  items: OrderDetail[];

  @OneToMany(() => OrderStatusLog, (statusLog) => statusLog.order)
  statusLog: OrderStatusLog[];
}
