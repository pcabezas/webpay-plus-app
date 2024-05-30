export const WEBPAY_RESULT_URL =
  'http://0.0.0.0:4000/api/v2/storefront/webpay/payment/transaction_result';

export const SUCESS_TRANSACTION_RESPONSE = {
  vci: 'TSY',
  amount: 10990,
  status: 'AUTHORIZED',
  buy_order: 'R999999999',
  session_id: 'S999999999',
  card_detail: { card_number: '6666' },
  accounting_date: '0821',
  transaction_date: '2023-08-21T17:26:24.524Z',
  authorization_code: '156191',
  payment_type_code: 'VD',
  response_code: 0,
  installments_number: 0,
};
