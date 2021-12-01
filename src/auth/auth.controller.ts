import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LogInDTO, LoginPayload, SignUpCustomerDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() input: SignUpCustomerDTO) {
    const user = await this.authService.signUp(input);
    return user;
  }

  @Post('signin')
  async signIn(@Body() input: LogInDTO): Promise<LoginPayload> {
    const result = await this.authService.logIn(input);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
