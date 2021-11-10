import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const created = this.userRepository.create({
      email,
      password,
    });
    const { id } = await this.userRepository.save(created);
    return this.findOne(id);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
