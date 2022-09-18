import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EverscaleService } from '../clients/everscale.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Pair } from './entities/pair.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../service/dto/pagination.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class PairService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Pair)
    private readonly pairRepository: Repository<Pair>,
    private readonly everscaleService: EverscaleService,
  ) {}

  getPair(id: string): Promise<Pair | undefined> {
    return this.pairRepository.findOne(id);
  }

  listPairs(pagination: PaginationDto): Promise<[Pair[], number]> {
    return this.pairRepository.findAndCount({
      skip: pagination.size * pagination.page,
      take: pagination.size,
      order: {
        [pagination.sortBy]: pagination.sortDirection,
      },
    });
  }

  createPair(pair: string, leftToken: Token, rightToken: Token): Promise<Pair> {
    return this.pairRepository.save({
      leftToken: leftToken.id,
      rightToken: rightToken.id,
      address: pair,
      scale: rightToken.decimals - leftToken.decimals,
      tokens: [leftToken, rightToken],
    });
  }

  removePair(id: string): Promise<Pair> {
    return this.pairRepository.softRemove({ id });
  }

  onApplicationBootstrap(): Promise<void> {
    return this.pairRepository
      .find()
      .then((pairs) =>
        pairs.forEach((pair) => this.everscaleService.subscribe(pair)),
      );
  }
}
