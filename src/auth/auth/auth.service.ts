import { Injectable, NotFoundException } from '@nestjs/common';
import {
  LogInDTO,
  LogInResponse,
  SignUpCustomerDTO,
  TokenPayload,
  UserRole,
} from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from '../../users/customers/customers.service';
import { Customer } from '../../users/customers/customers.entity';
import { UsersService } from '../../users/users/users.service';
import { User } from '../../users/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
  ) {}

  async logIn({ email, password }: LogInDTO): Promise<LogInResponse> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Correo o contraseña incorrectos');
    }

    const payload = this.generatePayload(user);
    const token = this.jwtService.sign(payload);

    // TODO: Handle return for workers
    return {
      id: user.id,
      email: user.email,
      fullName: user.customer.fullName,
      imageUrl: user.customer.imageUrl,
      phone: user.customer.phone,
      token,
    };
  }

  signUpCustomer(data: SignUpCustomerDTO): Promise<Customer> {
    return this.customersService.create(data);
  }

  private generatePayload(user: User): TokenPayload {
    let role: UserRole, subId: number;
    if (user.customer) {
      role = UserRole.CUSTOMER;
      subId = user.customer.id;
    } else {
      role = UserRole.WORKER;
      subId = user.worker.id;
    }

    return {
      id: user.id,
      role,
      subId,
    };
  }
}
