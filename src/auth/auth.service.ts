import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users/users.service';
import { LogInDTO, SignUpCustomerDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/users/customers/customers.service';
import { Customer } from 'src/users/customers/customers.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
  ) {}

  async logIn({ email, password }: LogInDTO) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      // exception
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      // exception
    }

    const payload = {
      id: user.id,
      customerId: user.customer?.id,
      workerId: user.worker?.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      ...user,
      token,
    };
  }

  signUp(data: SignUpCustomerDTO): Promise<Customer> {
    return this.customersService.create(data);
  }
}
