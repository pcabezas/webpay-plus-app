import { Module } from '@nestjs/common';
import { WebpayPlusModule } from './webpay-plus/webpay-plus.module';

@Module({
  imports: [WebpayPlusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
