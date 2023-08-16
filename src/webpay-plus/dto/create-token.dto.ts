import { IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  buyOrder: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  sessionId: string;

  @Min(1)
  @Max(999999999)
  @IsNotEmpty()
  amount: number;
}
