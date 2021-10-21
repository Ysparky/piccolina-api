import { Module } from '@nestjs/common';
import { BookingTablesService } from './booking-tables.service';
import { BookingTablesController } from './booking-tables.controller';

@Module({
  controllers: [BookingTablesController],
  providers: [BookingTablesService]
})
export class BookingTablesModule {}
