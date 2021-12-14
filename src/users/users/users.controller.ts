import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TokenPayload } from '../../auth/auth/auth.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    const user = req.user as TokenPayload;
    return this.usersService.findOne(user.id);
  }
}
