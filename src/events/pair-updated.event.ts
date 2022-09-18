import { Pair } from '../manager/entities/pair.entity';

export class PairUpdatedEvent {
  constructor(public readonly pair: Pair) {}
}
