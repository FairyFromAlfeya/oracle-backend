import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceServiceProxy } from '../proxy/price-service.proxy';
import { PricePaginationDto } from './dto/price-pagination.dto';
import { Price } from '../manager/entities/price.entity';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceServiceProxy: PriceServiceProxy) {}

  @Get(':pair')
  listPrices(
    @Param('pair') pair: string,
    @Query() query: PricePaginationDto,
  ): Promise<[Price[], number]> {
    return this.priceServiceProxy.listPrices(pair, query);
  }
}
