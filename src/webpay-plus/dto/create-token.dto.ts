import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  buyOrder: string;

  @IsString()
  @Length(9, 9)
  sessionId: string;

  @IsDecimal({ decimal_digits: '2' })
  @Min(1)
  @Max(999999999)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsUrl()
  returnUrl: string;
}
