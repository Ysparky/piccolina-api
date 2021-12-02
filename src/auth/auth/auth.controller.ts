import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LogInDTO, LogInResponse, SignUpCustomerDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() input: SignUpCustomerDTO, @Res() res: Response) {
    const user = await this.authService.signUpCustomer(input);
    return user
      ? res.status(HttpStatus.CREATED).send()
      : res.status(HttpStatus.BAD_REQUEST).send();
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() input: LogInDTO): Promise<LogInResponse> {
    return this.authService.logIn(input);
  }
}
