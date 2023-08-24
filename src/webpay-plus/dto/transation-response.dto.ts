import { IsNotEmpty } from 'class-validator';

export class TransactionResponseDto {
  vci: string;
  amount: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  buy_order: string;
  session_id: string;
  card_detail: CardDetailDto;
  accounting_date: string;
  transaction_date: Date;

  @IsNotEmpty()
  authorization_code: string;
  payment_type_code: string;

  @IsNotEmpty()
  response_code: number;
  installments_number: number;
}

class CardDetailDto {
  card_number: string;
}
