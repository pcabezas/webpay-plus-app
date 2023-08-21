import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from 'transbank-sdk';
import Transaction from 'transbank-sdk/dist/es5/transbank/webpay/webpay_plus/transaction';
import { TokenTransaction } from './interfaces/token-transaction.interface';
import { CreateTokenDto } from './dto/create-token.dto';
import { WEBPAY_RESULT_URL } from './constants/webpay';
import { TransactionResponseDto } from './dto/transation-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WebpayPlusService {
  private webpayTransaction: Transaction;
  private readonly logger = new Logger(WebpayPlusService.name);

  constructor() {
    this.webpayTransaction = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      ),
    );
  }

  generateTransaction = async (
    transaction: CreateTokenDto,
  ): Promise<false | TokenTransaction> => {
    this.logger.debug('Start webpayTransaction with: ', transaction);
    const { buyOrder, sessionId, amount } = transaction;
    try {
      const response = await this.webpayTransaction.create(
        buyOrder,
        sessionId,
        amount,
        WEBPAY_RESULT_URL,
      );
      this.logger.debug('webpayTransaction response: ', response);
      return response;
    } catch (error) {
      this.logger.error('webpayTransaction response: ', error);
      return false;
    }
  };

  confirmTransaction = async (
    token: string,
  ): Promise<TransactionResponseDto> => {
    this.logger.debug('Start webpayTransaction Commit with token ', token);
    try {
      const result = await this.webpayTransaction.commit(token);
      this.logger.debug('Success webpayTransaction Commit response: ', result);
      return plainToInstance(TransactionResponseDto, { ...result });
    } catch (error) {
      this.logger.error('webpayTransaction response on Commit: ', error);
      throw new BadRequestException(error.message);
    }
  };
}
