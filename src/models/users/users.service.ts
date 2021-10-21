import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/interfaces/payload.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, lastName, email, password } = createUserDto;
    const newUser: Partial<User> = {
      name,
      lastName,
      passwordHash: password,
      code: 'XXX',
      email,
      mobile: '',
    };
    const createdUser = this.userRepository.create(newUser);
    const { id } = await this.userRepository.save(createdUser);

    return this.findById(id);
  }

  findAll() {
    return `This action returns all users`;
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { flag: true, email } });
  }

  async findByLogin({ email, password }: LoginUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, flag: true },
    });

    console.log('user', user);

    if (!user || !(await this.comparePassword(password, user.passwordHash))) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async comparePassword(
    attempt: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(attempt, hashedPassword);
  }
}
