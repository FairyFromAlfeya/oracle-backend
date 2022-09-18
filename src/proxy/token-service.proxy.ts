import { Injectable } from '@nestjs/common';
import { EverscaleService } from '../clients/everscale.service';
import { TokenService } from '../manager/token.service';
import { Token } from '../manager/entities/token.entity';
import { TokenData } from './interfaces/token-data.interface';

@Injectable()
export class TokenServiceProxy {
  constructor(
    private readonly everscaleService: EverscaleService,
    private readonly tokenService: TokenService,
  ) {}

  getTokenByAddress(address: string): Promise<Token | undefined> {
    return this.tokenService.getTokenByAddress(address);
  }

  createToken(address: string): Promise<Token> {
    return this.aggregateTokenData(address).then((data) =>
      this.tokenService.createToken(
        address,
        data.name,
        data.symbol,
        data.decimals,
      ),
    );
  }

  private async aggregateTokenData(address: string): Promise<TokenData> {
    const name = await this.everscaleService.getTokenName(address);
    const symbol = await this.everscaleService.getTokenSymbol(address);
    const decimals = await this.everscaleService.getTokenDecimals(address);

    return {
      name,
      symbol,
      decimals,
    };
  }
}
