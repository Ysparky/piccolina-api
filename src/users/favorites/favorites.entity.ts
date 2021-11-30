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
import { Customer } from '../customers/customers.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.favorites)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.customersFavorite)
  @JoinColumn({ name: 'product_id' })
  product: Product;

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
