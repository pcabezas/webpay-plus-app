import { Test, TestingModule } from '@nestjs/testing';
import { WebpayPlusService } from './webpay-plus.service';
import { CreateTransaction } from './interfaces/create-transaction.interface';
import { TokenTransaction } from './interfaces/token-transaction.interface';
import { createTransactionObject } from './tests/helpers/webpay/faker/transaction';

describe('WebpayPlusService', () => {
  let service: WebpayPlusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpayPlusService],
    }).compile();

    service = module.get<WebpayPlusService>(WebpayPlusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generateTransaction', async () => {
    const transaction: CreateTransaction = createTransactionObject();
    const result: TokenTransaction | false = await service.generateTransaction(
      transaction,
    );
    expect(result).not.toBeFalsy();
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('url');
  });
});
