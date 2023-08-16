import { plainToInstance } from 'class-transformer';
import { createTransactionObject } from '../tests/helpers/webpay/faker/transaction';
import { CreateTokenDto } from './create-token.dto';
import { validate } from 'class-validator';

describe('CreateToken', () => {
  it('should throw when buyOrder is not present', async () => {
    const validDtoObject = createTransactionObject();
    const { buyOrder: _, ...badDtoObject } = validDtoObject;
    const objectDto = plainToInstance(CreateTokenDto, badDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('buyOrder should not be empty');
  });

  it('should throw when buyOrder is less than 9 characters', async () => {
    const validDtoObject = createTransactionObject();
    validDtoObject.buyOrder = 'R1';
    const objectDto = plainToInstance(CreateTokenDto, validDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'buyOrder must be longer than or equal to 9 characters',
    );
  });

  it('should throw when buyOrder is greater than 9 characters', async () => {
    const validDtoObject = createTransactionObject();
    validDtoObject.buyOrder = 'R111111111';
    const objectDto = plainToInstance(CreateTokenDto, validDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'buyOrder must be shorter than or equal to 9 characters',
    );
  });

  it('should throw when sessionId is not present', async () => {
    const validDtoObject = createTransactionObject();
    const { sessionId: _, ...badDtoObject } = validDtoObject;
    const objectDto = plainToInstance(CreateTokenDto, badDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('sessionId should not be empty');
  });

  it('should throw when amount is not present', async () => {
    const validDtoObject = createTransactionObject();
    const { amount: _, ...badDtoObject } = validDtoObject;
    const objectDto = plainToInstance(CreateTokenDto, badDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('amount should not be empty');
  });

  it('should throw when amount is less than 1', async () => {
    const validDtoObject = createTransactionObject();
    validDtoObject.amount = 0;
    const objectDto = plainToInstance(CreateTokenDto, validDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain('amount must not be less than 1');
  });

  it('should throw when amount is less than 1', async () => {
    const validDtoObject = createTransactionObject();
    validDtoObject.amount = 9999999999;
    const objectDto = plainToInstance(CreateTokenDto, validDtoObject);
    const errors = await validate(objectDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(
      'amount must not be greater than 999999999',
    );
  });

  it('Must be valid with valid DTO', async () => {
    const validDtoObject = createTransactionObject();
    const objectDto = plainToInstance(CreateTokenDto, validDtoObject);
    const errors = await validate(objectDto);
    console.log(JSON.stringify(errors));
    expect(errors.length).toBe(0);
  });
});
