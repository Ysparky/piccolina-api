import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './users.dto';
import { User } from './users.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersRepo.findOne({ where: { flag: true, id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({
      where: { flag: true, email },
      relations: ['customer', 'worker'],
      loadEagerRelations: true,
    });
  }

  async create({ email, password }: CreateUserDTO): Promise<User> {
    const user = await this.findByEmail(email);

    if (user) {
      throw new BadRequestException(`El correo ingresado ya está en uso`);
    }

    const created = this.usersRepo.create({
      email,
      password: this.hashPassword(password),
    });
    const { id } = await this.usersRepo.save(created);
    return this.findOne(id);
  }

  private hashPassword(password): string {
    return bcrypt.hashSync(password, 10);
  }
}
