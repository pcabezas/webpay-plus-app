import { Injectable, Logger } from '@nestjs/common';

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
    const { buyOrder, sessionId, amount, returnUrl } = transaction;
    try {
      const response = await this.webpayTransaction.create(
        buyOrder,
        sessionId,
        amount,
        returnUrl,
      );
      this.logger.debug('webpayTransaction response: ', response);
      return response;
    } catch (error) {
      this.logger.error('webpayTransaction response: ', error);
      return false;
    }
  };
}
