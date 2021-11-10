import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { RegisterUserPayload } from './dto/register-user.payload';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoginUserPayload } from './dto/login-user.payload';
import { RefreshTokenPayload } from './dto/refresh-token.payload';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginUserPayload)
  async login(@Args('data') data: LoginUserDTO): Promise<LoginUserPayload> {
    const user = await this.authService.validateUser(data);

    if (!user) {
      throw new UserInputError('Username or password incorrect.');
    }

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => RefreshTokenPayload)
  async refreshToken(@Args('input') input: RefreshTokenDTO) {
    const { user, token } =
      await this.authService.createAccessTokenFromRefreshToken(
        input.refreshToken,
      );

    const payload = new RefreshTokenPayload();
    payload.user = user;
    payload.accessToken = token;

    return payload;
  }

  @Mutation(() => RegisterUserPayload)
  async register(
    @Args('data') data: RegisterUserDTO,
  ): Promise<RegisterUserPayload> {
    const user = await this.authService.register(data);

    if (!user) {
      throw new UserInputError(`User by email ${data.email} already exists.`);
    }

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
