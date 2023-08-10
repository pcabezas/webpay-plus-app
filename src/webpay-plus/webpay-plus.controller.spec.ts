import { Test, TestingModule } from '@nestjs/testing';
import { WebpayPlusController } from './webpay-plus.controller';
import { WebpayPlusService } from './webpay-plus.service';
import { createTransactionObject } from './tests/helpers/webpay/faker/transaction';

describe('WebpayPlusController', () => {
  let controller: WebpayPlusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebpayPlusController],
      providers: [WebpayPlusService],
    }).compile();

    controller = module.get<WebpayPlusController>(WebpayPlusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createToken', async () => {
    const transaction = createTransactionObject();
    const response = await controller.createToken(transaction);
    expect(response).not.toBeFalsy();
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('url');
  });
});
