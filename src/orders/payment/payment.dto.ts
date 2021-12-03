import { IsCurrency, IsEnum, IsPositive } from 'class-validator';
import { PaymentStatusEnum } from './payment.entity';

export class CreatePaymentDTO {
  @IsPositive()
  order: number;

  @IsCurrency()
  amount: number;

  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;
}
