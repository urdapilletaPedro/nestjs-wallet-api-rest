import { IsEnum, IsNumber, Min } from 'class-validator';
import { CurrencyCode } from '../constans/defaultBalance';

export class AddBalanceDto {
  @IsEnum(CurrencyCode, {
    message: 'La moneda debe ser USD, PYG, BTC o ETH',
  })
  coin: CurrencyCode;

  @IsNumber()
  @Min(0)
  amount: number;
}
