import { IsNumber, IsString, Min, IsNotEmpty } from 'class-validator';

export class AddBalanceDto {
  @IsString()
  @IsNotEmpty()
  coin: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
