import { Body, Controller, Post } from '@nestjs/common';
import { WebpayPlusService } from './webpay-plus.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('webpay-plus')
export class WebpayPlusController {
  constructor(private readonly webpayService: WebpayPlusService) {}

  @Post('generate-token')
  async createToken(@Body() createTokenDto: CreateTokenDto) {
    return await this.webpayService.generateTransaction(createTokenDto);
  }
}
