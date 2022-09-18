import { Module } from '@nestjs/common';
import { ManagerModule } from '../manager/manager.module';
import { PriceServiceProxy } from './price-service.proxy';
import { PairServiceProxy } from './pair-service.proxy';
import { TokenServiceProxy } from './token-service.proxy';
import { TwapServiceProxy } from './twap-service.proxy';

@Module({
  imports: [ManagerModule],
  providers: [
    PriceServiceProxy,
    PairServiceProxy,
    TokenServiceProxy,
    TwapServiceProxy,
  ],
  exports: [
    PriceServiceProxy,
    PairServiceProxy,
    TokenServiceProxy,
    TwapServiceProxy,
  ],
})
export class ProxyModule {}
