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
    const createdUser = await this.usersService.create({ email, password });

    const createdCustomer = this.customersRepo.create({
      fullName,
      user: { id: createdUser.id },
      imageUrl: `https://picsum.photos/200/300?random=${this.getRandomInt(
        1,
        200,
      )}`,
    });

    const { id } = await this.customersRepo.save(createdCustomer);
    return this.findOne(id);
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
