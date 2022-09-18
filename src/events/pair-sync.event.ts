import { Pair } from '../manager/entities/pair.entity';

export class PairSyncEvent {
  constructor(
    public readonly pair: Pair,
    public readonly leftReserve: string,
    public readonly rightReserve: string,
  ) {}
}
