import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDTO } from './payment.dto';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create({ amount, order, status }: CreatePaymentDTO): Promise<void> {
    const created = this.paymentRepo.create({
      amount,
      status,
      order: { id: order },
    });
    await this.paymentRepo.save(created);
  }
}
