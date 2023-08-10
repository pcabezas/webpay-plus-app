import { faker } from '@faker-js/faker';
import { CreateTransaction } from 'src/webpay-plus/interfaces/create-transaction.interface';

export const createTransactionObject = (): CreateTransaction => {
  return {
    buyOrder: faker.string.alphanumeric(9),
    sessionId: faker.string.alphanumeric(9),
    amount: faker.number.float({ min: 5, max: 5, precision: 2 }),
    returnUrl: 'http://0.0.0.0:3000/webpay/results',
  };
};
