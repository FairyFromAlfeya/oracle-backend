import { Controller, Get, Param, Query } from '@nestjs/common';
import { TwapPaginationDto } from './dto/twap-pagination.dto';
import { TwapServiceProxy } from '../proxy/twap-service.proxy';
import { Twap } from '../manager/entities/twap.entity';

@Controller('twaps')
export class TwapController {
  constructor(private readonly twapServiceProxy: TwapServiceProxy) {}

  @Get(':pair')
  listTwaps(
    @Param('pair') pair: string,
    @Query() query: TwapPaginationDto,
  ): Promise<[Twap[], number]> {
    return this.twapServiceProxy.listTwaps(pair, query);
  }
}
