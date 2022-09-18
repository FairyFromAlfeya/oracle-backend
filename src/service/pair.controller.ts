import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PairServiceProxy } from '../proxy/pair-service.proxy';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePairDto } from './dto/create-pair.dto';
import { RemovePairDto } from './dto/remove-pair.dto';
import { Pair } from '../manager/entities/pair.entity';

@Controller('pairs')
export class PairController {
  constructor(private readonly pairServiceProxy: PairServiceProxy) {}

  @Get(':id')
  getPair(@Param('id') id: string): Promise<Pair | undefined> {
    return this.pairServiceProxy.getPair(id);
  }

  @Get()
  listPairs(@Query() query: PaginationDto): Promise<[Pair[], number]> {
    return this.pairServiceProxy.listPairs(query);
  }

  @Post()
  createPair(@Body() body: CreatePairDto): Promise<Pair> {
    return this.pairServiceProxy.createPair(body.address);
  }

  @Delete()
  removePair(@Body() body: RemovePairDto): Promise<Pair> {
    return this.pairServiceProxy.removePair(body.id);
  }
}
