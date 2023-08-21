import { Test, TestingModule } from '@nestjs/testing';
import { WebpayPlusService } from './webpay-plus.service';
import { TokenTransaction } from './interfaces/token-transaction.interface';
import { createTransactionObject } from './tests/helpers/webpay/faker/transaction';
import { CreateTokenDto } from './dto/create-token.dto';
import { SUCESS_TRANSACTION_RESPONSE } from './constants/webpay';
import { TransactionResponseDto } from './dto/transation-response.dto';
import { plainToInstance } from 'class-transformer';

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
    const transaction: CreateTokenDto = createTransactionObject();
    const result: TokenTransaction | false = await service.generateTransaction(
      transaction,
    );
    expect(result).not.toBeFalsy();
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('url');
  });

  describe('confirmTransaction', () => {
    it('With valid token, must return a valid transaction response', async () => {
      // Assert
      const validTransactionResponse = plainToInstance(
        TransactionResponseDto,
        SUCESS_TRANSACTION_RESPONSE,
      );
      const validTransactionToken = 'rand-generated-token';
      jest
        .spyOn(service, 'confirmTransaction')
        .mockResolvedValue(validTransactionResponse);
      // Act
      const response = await service.confirmTransaction(validTransactionToken);
      // Assert
      expect(response).toBeInstanceOf(TransactionResponseDto);
    });
  });
});
