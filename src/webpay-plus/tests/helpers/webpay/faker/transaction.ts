import { faker } from '@faker-js/faker';
import { CreateTokenDto } from 'src/webpay-plus/dto/create-token.dto';

export const createTransactionObject = (): CreateTokenDto => {
  return {
    buyOrder: faker.string.alphanumeric(9),
    sessionId: faker.string.alphanumeric(9),
    amount: faker.number.int({ min: 1, max: 99999 }),
  };
};
