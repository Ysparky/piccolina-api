import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersRepo.findOne({ where: { flag: true, id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({ where: { flag: true, email } });
  }

  async create({ email, password }: CreateUserDTO): Promise<User> {
    const created = this.usersRepo.create({ email, password });
    const { id } = await this.usersRepo.save(created);
    return this.findOne(id);
  }
}
