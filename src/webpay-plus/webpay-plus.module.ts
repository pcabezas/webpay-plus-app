import { Module } from '@nestjs/common';
import { WebpayPlusService } from './webpay-plus.service';

@Module({
  providers: [WebpayPlusService],
})
export class WebpayPlusModule {}
