import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { User } from '../../users/users/users.entity';
import { LogInResponse, SignUpCustomerDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() input: SignUpCustomerDTO, @Res() res: Response) {
    const user = await this.authService.signUpCustomer(input);
    return user
      ? res.status(HttpStatus.CREATED).send()
      : res.status(HttpStatus.BAD_REQUEST).send();
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  @HttpCode(200)
  async signIn(@Req() req: Request): Promise<LogInResponse> {
    const user = req.user as User;
    return this.authService.generateToken(user);
  }
}
