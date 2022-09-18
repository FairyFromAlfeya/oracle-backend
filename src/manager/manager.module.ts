import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pair } from './entities/pair.entity';
import { Price } from './entities/price.entity';
import { Token } from './entities/token.entity';
import { Twap } from './entities/twap.entity';
import { TwapService } from './twap.service';
import { TokenService } from './token.service';
import { PriceService } from './price.service';
import { PairService } from './pair.service';
import { PairSubscriber } from './pair.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Pair, Price, Token, Twap])],
  providers: [
    PairService,
    TokenService,
    PriceService,
    TwapService,
    PairSubscriber,
  ],
  exports: [PairService, TokenService, PriceService, TwapService],
})
export class ManagerModule {}
