import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards/cards.entity';
import { Customer } from './customers/customers.entity';
import { CustomersService } from './customers/customers.service';
import { Location } from './locations/locations.entity';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { Worker } from './worker/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Worker, Location, Card])],
  controllers: [],
  providers: [CustomersService, UsersService],
  exports: [UsersService, CustomersService],
})
export class UserModule {}
