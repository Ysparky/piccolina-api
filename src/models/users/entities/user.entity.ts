import { BookingTable } from 'src/models/booking-tables/entities/booking-table.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column({ name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column({ default: true })
  flag: boolean;

  @OneToMany(() => BookingTable, (booking) => booking.user)
  bookings?: BookingTable[];

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hashSync(this.passwordHash, 10);
  }
}
