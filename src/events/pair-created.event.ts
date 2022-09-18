import { Pair } from '../manager/entities/pair.entity';

export class PairCreatedEvent {
  constructor(public readonly pair: Pair) {}
}
