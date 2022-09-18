import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { PairSyncEvent } from '../events/pair-sync.event';
import { Twap } from './entities/twap.entity';
import { EverscaleService } from '../clients/everscale.service';
import { TwapPaginationDto } from '../service/dto/twap-pagination.dto';
import { Pair } from './entities/pair.entity';
import { cumulativeToPrice, timestampToDateString } from '../utils';

@Injectable()
export class TwapService {
  private readonly logger = new Logger('TwapService');
  private readonly intervals = (process.env.TWAP_INTERVALS || '').split(',');

  constructor(
    @InjectRepository(Twap)
    private readonly twapRepository: Repository<Twap>,
    private readonly everscaleService: EverscaleService,
  ) {}

  listTwaps(
    pair: string,
    pagination: TwapPaginationDto,
  ): Promise<[Twap[], number]> {
    return this.twapRepository.findAndCount({
      where: { pair, interval: pagination.interval },
      skip: pagination.size * pagination.page,
      take: pagination.size,
      order: {
        [pagination.sortBy]: pagination.sortDirection,
      },
    });
  }

  @OnEvent('pair.sync')
  async onPairSync(event: PairSyncEvent): Promise<void[]> {
    return Promise.all(
      this.intervals.map((interval) => this.requestTwap(event.pair, +interval)),
    );
  }

  private requestTwap(pair: Pair, interval: number): Promise<void> {
    const now = new Date(Date.now());

    return this.everscaleService
      .getPairRate(pair.address, new Date(now.getTime() - interval * 1000), now)
      .then((rate) =>
        this.twapRepository.save({
          pair,
          interval,
          price0To1: cumulativeToPrice(rate.price0To1, pair.scale),
          price1To0: cumulativeToPrice(rate.price1To0, -pair.scale),
          fromTimestamp: timestampToDateString(rate.fromTimestamp),
          toTimestamp: timestampToDateString(rate.toTimestamp),
        }),
      )
      .then(() =>
        this.logger.log(`Saved new twap: ${pair.address} - ${interval}`),
      );
  }
}
