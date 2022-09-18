import { Injectable } from '@nestjs/common';
import { TwapPaginationDto } from '../service/dto/twap-pagination.dto';
import { TwapService } from '../manager/twap.service';
import { Twap } from '../manager/entities/twap.entity';

@Injectable()
export class TwapServiceProxy {
  constructor(private readonly twapService: TwapService) {}

  listTwaps(
    pair: string,
    pagination: TwapPaginationDto,
  ): Promise<[Twap[], number]> {
    return this.twapService.listTwaps(pair, pagination);
  }
}
