import { Pair } from '../manager/entities/pair.entity';

export class PairRemovedEvent {
  constructor(public readonly pair: Pair) {}
}
