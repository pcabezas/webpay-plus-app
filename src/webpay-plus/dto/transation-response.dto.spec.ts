import { plainToInstance } from 'class-transformer';
import { SUCESS_TRANSACTION_RESPONSE } from '../constants/webpay';
import { TransactionResponseDto } from './transation-response.dto';
import { validate } from 'class-validator';

describe('TransactionResponseDto', () => {
  it('should trow without authorization_code', async () => {
    // Arrange
    const validDtoObject = SUCESS_TRANSACTION_RESPONSE;
    const { authorization_code: _, ...badDtoObject } = validDtoObject;
    const objectDto = plainToInstance(TransactionResponseDto, badDtoObject);
    // Act
    const errors = await validate(objectDto);
    // Assert
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'authorization_code should not be empty',
    );
  });

  it('should trow without response_code', async () => {
    // Arrange
    const validDtoObject = SUCESS_TRANSACTION_RESPONSE;
    const { response_code: _, ...badDtoObject } = validDtoObject;
    const objectDto = plainToInstance(TransactionResponseDto, badDtoObject);
    // Act
    const errors = await validate(objectDto);
    // Assert
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'response_code should not be empty',
    );
  });

  it('should trow without buy_order', async () => {
    // Arrange
    const validDtoObject = SUCESS_TRANSACTION_RESPONSE;
    const { buy_order: _, ...badDtoObject } = validDtoObject;
    const objectDto = plainToInstance(TransactionResponseDto, badDtoObject);
    // Act
    const errors = await validate(objectDto);
    // Assert
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('buy_order should not be empty');
  });
});
