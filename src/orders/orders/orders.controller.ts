import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenPayload } from 'src/auth/auth/auth.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDTO } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async orderCreate(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: CreateOrderDTO,
  ) {
    const user = req.user as TokenPayload;
    await this.ordersService.create(user.subId, data);
    return res.status(HttpStatus.CREATED).send();
  }
}
