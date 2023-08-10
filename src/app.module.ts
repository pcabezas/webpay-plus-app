import { Module } from '@nestjs/common';
import { WebpayPlusModule } from './webpay-plus/webpay-plus.module';
import { WebpayPlusController } from './webpay-plus/webpay-plus.controller';

@Module({
  imports: [WebpayPlusModule],
  controllers: [WebpayPlusController],
  providers: [],
})
export class AppModule {}
