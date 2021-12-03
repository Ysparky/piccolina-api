import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty()
  quantity: number;

  @IsPositive()
  @ApiProperty()
  product: number;

  @IsCurrency()
  @IsOptional()
  @ApiPropertyOptional()
  totalPrice: number;
}

export class CreateOrderDTO {
  @IsPositive()
  @ApiProperty()
  location: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDTO)
  @ApiProperty({
    isArray: true,
    type: DetailDTO,
  })
  details: DetailDTO[];
}
