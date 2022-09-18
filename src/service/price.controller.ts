import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceServiceProxy } from '../proxy/price-service.proxy';
import { PaginationDto } from './dto/pagination.dto';
import { Price } from '../manager/entities/price.entity';

@Controller('prices')
export class PriceController {
  constructor(private readonly priceServiceProxy: PriceServiceProxy) {}

  @Get(':pair')
  listPrices(
    @Param('pair') pair: string,
    @Query() query: PaginationDto,
  ): Promise<[Price[], number]> {
    return this.priceServiceProxy.listPrices(pair, query);
  }
}
