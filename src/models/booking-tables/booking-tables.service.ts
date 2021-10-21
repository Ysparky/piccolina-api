import { Injectable } from '@nestjs/common';
import { CreateBookingTableDto } from './dto/create-booking-table.dto';
import { UpdateBookingTableDto } from './dto/update-booking-table.dto';

@Injectable()
export class BookingTablesService {
  create(createBookingTableDto: CreateBookingTableDto) {
    return 'This action adds a new bookingTable';
  }

  findAll() {
    return `This action returns all bookingTables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingTable`;
  }

  update(id: number, updateBookingTableDto: UpdateBookingTableDto) {
    return `This action updates a #${id} bookingTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingTable`;
  }
}
