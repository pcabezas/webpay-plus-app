export class TransactionResponseDto {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  card_detail: CardDetailDto;
  accounting_date: string;
  transaction_date: Date;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
}

class CardDetailDto {
  card_number: string;
}
