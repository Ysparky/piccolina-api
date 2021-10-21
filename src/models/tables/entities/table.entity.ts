import { BookingTable } from 'src/models/booking-tables/entities/booking-table.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum TableStatus {
  FREE = 'Free',
  RESERVED = 'Reserved',
  ACTIVE = 'Active',
}

@Entity('table')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ type: 'enum', enum: TableStatus, default: TableStatus.FREE })
  status: string;

  @Column({ default: 4 })
  capacity: number;

  @Column({ default: true })
  flag: boolean;

  @OneToMany(() => BookingTable, (booking) => booking.table)
  bookings: BookingTable[];
}
