import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  NEW,
  CHECKOUT,
  PAID,
  FAILED,
  SHIPPED,
  DELIVERED,
  RETURNED,
  COMPLETE,
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: string;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  subTotal: number;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  tax: number;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  shipping: number;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  total: number;

  @Column({ default: true })
  flag: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItem: OrderItem[];
}
