import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingTablesService } from './booking-tables.service';
import { CreateBookingTableDto } from './dto/create-booking-table.dto';
import { UpdateBookingTableDto } from './dto/update-booking-table.dto';

@Controller('booking-tables')
export class BookingTablesController {
  constructor(private readonly bookingTablesService: BookingTablesService) {}

  @Post()
  create(@Body() createBookingTableDto: CreateBookingTableDto) {
    return this.bookingTablesService.create(createBookingTableDto);
  }

  @Get()
  findAll() {
    return this.bookingTablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingTablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingTableDto: UpdateBookingTableDto) {
    return this.bookingTablesService.update(+id, updateBookingTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingTablesService.remove(+id);
  }
}
