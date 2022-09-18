import { Injectable } from '@nestjs/common';
import { EverscaleService } from '../clients/everscale.service';
import { PairService } from '../manager/pair.service';
import { TokenServiceProxy } from './token-service.proxy';
import { PaginationDto } from '../service/dto/pagination.dto';
import { Pair } from '../manager/entities/pair.entity';
import { PairData } from './interfaces/pair-data.interface';

@Injectable()
export class PairServiceProxy {
  constructor(
    private readonly everscaleService: EverscaleService,
    private readonly tokenServiceProxy: TokenServiceProxy,
    private readonly pairService: PairService,
  ) {}

  getPair(id: string): Promise<Pair | undefined> {
    return this.pairService.getPair(id);
  }

  listPairs(pagination: PaginationDto): Promise<[Pair[], number]> {
    return this.pairService.listPairs(pagination);
  }

  createPair(address: string): Promise<Pair> {
    return this.aggregatePairData(address).then((data) =>
      this.pairService.createPair(address, data.leftToken, data.rightToken),
    );
  }

  removePair(id: string): Promise<Pair> {
    return this.pairService.removePair(id);
  }

  private async aggregatePairData(address: string): Promise<PairData> {
    const tokens = await this.everscaleService.getPairTokens(address);

    let leftToken = await this.tokenServiceProxy.getTokenByAddress(tokens.left);
    let rightToken = await this.tokenServiceProxy.getTokenByAddress(
      tokens.right,
    );

    if (!leftToken) {
      leftToken = await this.tokenServiceProxy.createToken(tokens.left);
    }

    if (!rightToken) {
      rightToken = await this.tokenServiceProxy.createToken(tokens.right);
    }

    return {
      leftToken,
      rightToken,
    };
  }
}
