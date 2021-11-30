import { Exclude } from 'class-transformer';
import { Customer } from 'src/users/customers/customers.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  comment: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  rating: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.reviews)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'boolean', default: true })
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
}
