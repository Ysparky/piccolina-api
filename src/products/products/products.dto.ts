import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterProductsDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsPositive()
  category: number;
}
