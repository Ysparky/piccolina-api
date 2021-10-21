import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingTableDto } from './create-booking-table.dto';

export class UpdateBookingTableDto extends PartialType(CreateBookingTableDto) {}
