import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  getTokenByAddress(address: string): Promise<Token | undefined> {
    return this.tokenRepository.findOne({ address });
  }

  createToken(
    address: string,
    name: string,
    symbol: string,
    decimals: number,
  ): Promise<Token> {
    return this.tokenRepository.save({ address, name, symbol, decimals });
  }
}
