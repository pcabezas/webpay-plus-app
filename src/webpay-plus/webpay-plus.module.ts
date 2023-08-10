import { Module } from '@nestjs/common';
import { WebpayPlusService } from './webpay-plus.service';
import { WebpayPlusController } from './webpay-plus.controller';

@Module({
  providers: [WebpayPlusService],
  controllers: [WebpayPlusController],
})
export class WebpayPlusModule {}
