import { Test, TestingModule } from '@nestjs/testing';
import { WebpayPlusController } from './webpay-plus.controller';
import { WebpayPlusService } from './webpay-plus.service';
import { createTransactionObject } from './tests/helpers/webpay/faker/transaction';
import { SUCESS_TRANSACTION_RESPONSE } from './constants/webpay';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionResponseDto } from './dto/transation-response.dto';
import { plainToInstance } from 'class-transformer';

describe('WebpayPlusController', () => {
  let controller: WebpayPlusController;
  let webpayPlusService: WebpayPlusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebpayPlusController],
      providers: [WebpayPlusService],
    }).compile();
    webpayPlusService = module.get<WebpayPlusService>(WebpayPlusService);
    controller = module.get<WebpayPlusController>(WebpayPlusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createToken', () => {
    it('With valid request must be return valid webpaytoken and url', async () => {
      const transaction = createTransactionObject();
      const response = await controller.createToken(transaction);
      expect(response).not.toBeFalsy();
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('url');
    });
  });

  describe('validateTransaction', () => {
    it('must return valid transaction object with valid token', async () => {
      // Arrange
      const validTransactionToken = 'rand-generated-token';
      const validTransactionResponse = plainToInstance(
        TransactionResponseDto,
        SUCESS_TRANSACTION_RESPONSE,
      );
      jest
        .spyOn(webpayPlusService, 'confirmTransaction')
        .mockResolvedValue(validTransactionResponse);
      // Act
      const response = await controller.validateTransaction(
        validTransactionToken,
      );
      // Assert
      expect(response).toBe(validTransactionResponse);
    });

    it('must thow error with invalid token', async () => {
      // Arrange
      const validTransactionToken = 'rand-generated-token';
      try {
        // Act
        await controller.validateTransaction(validTransactionToken);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
