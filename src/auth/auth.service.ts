import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/models/users/entities/user.entity';

import { JwtPayload } from './interfaces/payload.interface';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<Partial<User>> {
    const user = await this.usersService.findOne(payload.email);
    console.log('user', user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
  }

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDTO): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDTO);
    const token = this._createToken(user);
    return {
      userId: user.id,
      ...token,
    };
  }

  private _createToken({ id, name, lastName, email }: User) {
    const expiresIn = process.env.EXPIRESIN;
    const payload: JwtPayload = {
      id,
      email,
      name,
      lastName,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn,
      accessToken,
    };
  }
}
