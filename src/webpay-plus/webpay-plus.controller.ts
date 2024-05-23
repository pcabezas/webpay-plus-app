import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebpayPlusService } from './webpay-plus.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('webpay-plus')
export class WebpayPlusController {
  constructor(private readonly webpayService: WebpayPlusService) {}

  @Post('/transactions/create')
  async createToken(@Body() createTokenDto: CreateTokenDto) {
    return await this.webpayService.generateTransaction(createTokenDto);
  }

  @Get('/transactions/result')
  async validateTransaction(@Query('token_ws') token_ws: string) {
    const result = await this.webpayService.confirmTransaction(token_ws);
    return result;
  }
}
