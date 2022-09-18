import { Module } from '@nestjs/common';
import { ProxyModule } from '../proxy/proxy.module';
import { PriceController } from './price.controller';
import { PairController } from './pair.controller';
import { TwapController } from './twap.controller';

@Module({
  imports: [ProxyModule],
  controllers: [PriceController, PairController, TwapController],
  providers: [],
})
export class ServiceModule {}
