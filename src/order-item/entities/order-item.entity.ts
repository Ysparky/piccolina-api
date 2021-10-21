import { Item } from 'src/items/entities/item.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @JoinColumn({ name: 'item_id' })
  @ManyToOne(() => Item, (item) => item.id, { nullable: false })
  item: Item;

  @JoinColumn({ name: 'order_id' })
  @ManyToOne(() => Order, (order) => order.id, { nullable: false })
  order: Order;

  @Column({ type: 'decimal', precision: 9, scale: 3 })
  price: number;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column({ default: true })
  flag: boolean;
}
