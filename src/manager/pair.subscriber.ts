import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Pair } from './entities/pair.entity';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PairCreatedEvent } from '../events/pair-created.event';
import { PairUpdatedEvent } from '../events/pair-updated.event';
import { PairRemovedEvent } from '../events/pair-removed.event';

@EventSubscriber()
export class PairSubscriber implements EntitySubscriberInterface<Pair> {
  private readonly logger = new Logger('PairSubscriber');

  constructor(
    private readonly connection: Connection,
    private readonly eventEmitter: EventEmitter2,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Pair;
  }

  afterInsert(event: InsertEvent<Pair>): void {
    this.logger.log(`Insert: ${event.entity.id} - ${event.entity.address}`);

    this.eventEmitter.emit('pair.created', new PairCreatedEvent(event.entity));
  }

  afterUpdate(event: UpdateEvent<Pair>): void {
    this.logger.log(
      `Update: ${event.databaseEntity.id} - ${event.databaseEntity.address}`,
    );

    this.eventEmitter.emit(
      'pair.updated',
      new PairUpdatedEvent(event.databaseEntity),
    );
  }

  afterSoftRemove(event: RemoveEvent<Pair>): void {
    this.logger.log(
      `Remove: ${event.databaseEntity.id} - ${event.databaseEntity.address}`,
    );

    this.eventEmitter.emit(
      'pair.removed',
      new PairRemovedEvent(event.databaseEntity),
    );
  }
}
