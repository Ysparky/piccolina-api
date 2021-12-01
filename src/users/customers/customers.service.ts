import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateCustomerDTO } from './customers.dto';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepo: Repository<Customer>,
    private readonly usersService: UsersService,
  ) {}

  findOne(id: Number): Promise<Customer> {
    return this.customersRepo.findOne({ where: { flag: true, id } });
  }

  async create({
    name: fullName,
    email,
    password,
  }: CreateCustomerDTO): Promise<Customer> {
    const user = await this.usersService.create({ email, password });

    const created = this.customersRepo.create({
      fullName,
      user: { id: user.id },
    });

    const { id } = await this.customersRepo.save(created);
    return this.findOne(id);
  }
}
