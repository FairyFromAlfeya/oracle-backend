import { Injectable } from '@nestjs/common';
import { PriceService } from '../manager/price.service';
import { PricePaginationDto } from '../service/dto/price-pagination.dto';
import { Price } from '../manager/entities/price.entity';

@Injectable()
export class PriceServiceProxy {
  constructor(private readonly priceService: PriceService) {}

  listPrices(
    pair: string,
    pagination: PricePaginationDto,
  ): Promise<[Price[], number]> {
    return this.priceService.listPrices(pair, pagination);
  }
}
