import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { TokenPayload } from '../../auth/auth/auth.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateOrderDTO } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  orders(@Req() req: Request) {
    const user = req.user as TokenPayload;
    return this.ordersService.findByCustomer(user.subId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async orderCreate(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: CreateOrderDTO,
  ) {
    const user = req.user as TokenPayload;
    console.log(user);

    await this.ordersService.create(user.subId, data);
    return res.status(HttpStatus.CREATED).send();
  }
}
