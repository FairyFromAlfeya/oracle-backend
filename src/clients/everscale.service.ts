import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { EverscaleStandaloneClient } from 'everscale-standalone-client/nodejs';
import {
  ProviderRpcClient,
  Address,
  Subscriber,
} from 'everscale-inpage-provider';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { Pair } from '../manager/entities/pair.entity';
import { PairCreatedEvent } from '../events/pair-created.event';
import { PairRemovedEvent } from '../events/pair-removed.event';
import { PairSyncEvent } from '../events/pair-sync.event';
import { dexPairAbi } from '../configs/dex-pair.abi';
import { tokenRootAbi } from '../configs/token-root.abi';
import { everscaleConfig } from '../configs/everscale.config';
import { Sync } from './interfaces/sync.interface';
import { PairTokens } from './interfaces/pair-tokens.interface';
import { PairRate } from './interfaces/pair-rate.interface';

@Injectable()
export class EverscaleService implements OnModuleDestroy {
  private readonly logger = new Logger('EverscaleService');
  private readonly client = new ProviderRpcClient({
    forceUseFallback: true,
    fallback: () =>
      EverscaleStandaloneClient.create(
        everscaleConfig(this.configService.get('EVERCLOUD_URL') || ''),
      ),
  });
  private readonly subscribers: Record<string, Subscriber> = {};

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  /*
   *  ____            ____       _
   * |  _ \  _____  _|  _ \ __ _(_)_ __
   * | | | |/ _ \ \/ / |_) / _` | | '__|
   * | |_| |  __/>  <|  __/ (_| | | |
   * |____/ \___/_/\_\_|   \__,_|_|_|
   */

  getPairRate(pair: string, from: Date, to: Date): Promise<PairRate> {
    return new this.client.Contract(dexPairAbi, new Address(pair)).methods
      .getRate({
        answerId: 0,
        _fromTimestamp: Math.floor(from.getTime() / 1000),
        _toTimestamp: Math.floor(to.getTime() / 1000),
      })
      .call()
      .then(
        (response) =>
          response.value0 || {
            price1To0: '0',
            price0To1: '0',
            fromTimestamp: '0',
            toTimestamp: '0',
          },
      );
  }

  getPairTokens(pair: string): Promise<PairTokens> {
    return new this.client.Contract(dexPairAbi, new Address(pair)).methods
      .getTokenRoots({ answerId: 0 })
      .call()
      .then((response) => ({
        left: response.left.toString(),
        right: response.right.toString(),
        lp: response.lp.toString(),
      }));
  }

  /*
   *  _____     _
   * |_   _|__ | | _____ _ __  ___
   *   | |/ _ \| |/ / _ \ '_ \/ __|
   *   | | (_) |   <  __/ | | \__ \
   *   |_|\___/|_|\_\___|_| |_|___/
   */

  getTokenName(token: string): Promise<string> {
    return new this.client.Contract(tokenRootAbi, new Address(token)).methods
      .name({ answerId: 0 })
      .call()
      .then((response) => response.value0);
  }

  getTokenSymbol(token: string): Promise<string> {
    return new this.client.Contract(tokenRootAbi, new Address(token)).methods
      .symbol({ answerId: 0 })
      .call()
      .then((response) => response.value0);
  }

  getTokenDecimals(token: string): Promise<number> {
    return new this.client.Contract(tokenRootAbi, new Address(token)).methods
      .decimals({ answerId: 0 })
      .call()
      .then((response) => +response.value0);
  }

  /*
   *  _____                 _
   * | ____|_   _____ _ __ | |_ ___
   * |  _| \ \ / / _ \ '_ \| __/ __|
   * | |___ \ V /  __/ | | | |_\__ \
   * |_____| \_/ \___|_| |_|\__|___/
   */

  subscribe(pair: Pair): void {
    if (pair.id) {
      const subscriber = new this.client.Subscriber();
      const contract = new this.client.Contract(
        dexPairAbi,
        new Address(pair.address),
      );

      this.subscribers[pair.id] = subscriber;

      contract
        .events(subscriber)
        .filter((event) => event.event === 'Sync')
        .on((event) => this.emitSyncEvent(pair, (event.data as Sync).reserves));

      this.logger.log(`Subscribed to pair: ${pair.id}`);
    } else {
      throw 'Subscribe was failed: pair ID is empty';
    }
  }

  unsubscribe(pair: string): Promise<void> {
    return this.subscribers[pair].unsubscribe().then(() => {
      delete this.subscribers[pair];
      this.logger.log(`Unsubscribed from pair: ${pair}`);
    });
  }

  onModuleDestroy(): Promise<void[]> {
    return Promise.all(
      Object.keys(this.subscribers).map((pair) => this.unsubscribe(pair)),
    );
  }

  private emitSyncEvent(pair: Pair, reserves: string[]): void {
    this.eventEmitter.emit(
      'pair.sync',
      new PairSyncEvent(pair, reserves[0], reserves[1]),
    );
  }

  @OnEvent('pair.created')
  private onPairCreated(event: PairCreatedEvent): void {
    this.subscribe(event.pair);
  }

  @OnEvent('pair.removed')
  private onPairRemoved(event: PairRemovedEvent): Promise<void> {
    if (event.pair.id) {
      return this.unsubscribe(event.pair.id);
    } else {
      throw 'Unsubscribe was failed: pair ID is empty';
    }
  }
}
