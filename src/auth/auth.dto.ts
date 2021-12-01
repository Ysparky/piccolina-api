import { IsEmail, IsString } from 'class-validator';

export class LogInDTO {
  @IsEmail()
  email: string;

  password: string;
}

export class LoginPayload {
  // user: User
}

export class SignUpCustomerDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
