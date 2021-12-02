import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { User } from '../..//users/users/users.entity';

export class AuthDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LogInDTO extends AuthDTO {}

export class SignUpCustomerDTO extends AuthDTO {
  @IsString()
  name: string;

  @MinLength(8)
  password: string;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
}

export interface TokenPayload {
  id: number;
  role: UserRole;
  subId: number;
}

export interface LogInResponse {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  imageUrl: string;
  token: string;
}
