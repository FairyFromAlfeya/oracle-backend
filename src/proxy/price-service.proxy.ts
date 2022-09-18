import { Injectable } from '@nestjs/common';
import { PriceService } from '../manager/price.service';
import { PaginationDto } from '../service/dto/pagination.dto';
import { Price } from '../manager/entities/price.entity';

@Injectable()
export class PriceServiceProxy {
  constructor(private readonly priceService: PriceService) {}

  listPrices(
    pair: string,
    pagination: PaginationDto,
  ): Promise<[Price[], number]> {
    return this.priceService.listPrices(pair, pagination);
  }
}
