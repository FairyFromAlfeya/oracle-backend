import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { PairSyncEvent } from '../events/pair-sync.event';
import { PaginationDto } from '../service/dto/pagination.dto';
import { reservesToPrice } from '../utils';

@Injectable()
export class PriceService {
  private readonly logger = new Logger('PriceService');

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  listPrices(
    pair: string,
    pagination: PaginationDto,
  ): Promise<[Price[], number]> {
    return this.priceRepository.findAndCount({
      where: { pair },
      skip: pagination.size * pagination.page,
      take: pagination.size,
      order: {
        [pagination.sortBy]: pagination.sortDirection,
      },
    });
  }

  @OnEvent('pair.sync')
  onPairSync(event: PairSyncEvent): Promise<void> {
    return this.priceRepository
      .save({
        leftReserve: event.leftReserve,
        rightReserve: event.rightReserve,
        pair: event.pair,
        price0To1: reservesToPrice(
          event.leftReserve,
          event.rightReserve,
          event.pair.scale,
        ),
        price1To0: reservesToPrice(
          event.rightReserve,
          event.leftReserve,
          -event.pair.scale,
        ),
      })
      .then(() =>
        this.logger.log(
          `Saved new price: ${event.pair.address} - ${event.leftReserve} - ${event.rightReserve}`,
        ),
      );
  }
}
