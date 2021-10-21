import { Table } from 'src/models/tables/entities/table.entity';
import { User } from 'src/models/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BookingTableStatus {
  NEW,
  LOUNGE,
  ACTIVE,
  COMPLETE,
}

@Entity('booking_table')
export class BookingTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @JoinColumn({ name: 'table_id' })
  @ManyToOne(() => Table, (table) => table.bookings, { nullable: false })
  table: Table;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
  user: User;

  @Column({
    type: 'enum',
    enum: BookingTableStatus,
    default: BookingTableStatus.NEW,
  })
  status: string;

  @Column({ default: true })
  flag: boolean;
}
