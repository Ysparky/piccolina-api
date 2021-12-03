import { Type } from 'class-transformer';
import {
  IsArray,
  IsCurrency,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';

export class DetailDTO {
  @Min(0)
  quantity: number;

  @IsPositive()
  product: number;

  @IsCurrency()
  @IsOptional()
  totalPrice: number;
}

export class CreateOrderDTO {
  @IsPositive()
  location: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDTO)
  details: DetailDTO[];
}
