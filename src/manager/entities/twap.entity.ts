import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { dateColumnTransformer } from '../../utils';
import { Pair } from './pair.entity';

@Entity({ name: 'twaps' })
export class Twap {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @JoinColumn({ name: 'pair_id' })
  @ManyToOne(() => Pair, (pair) => pair.prices)
  pair: Pair;

  @Column({ name: 'price_0_to_1', type: 'numeric', precision: 78, scale: 18 })
  price0To1: string;

  @Column({ name: 'price_1_to_0', type: 'numeric', precision: 78, scale: 18 })
  price1To0: string;

  @Column('integer')
  interval: number;

  @Column({
    transformer: dateColumnTransformer,
    name: 'from_timestamp',
    type: 'timestamptz',
  })
  fromTimestamp: string;

  @Column({
    transformer: dateColumnTransformer,
    name: 'to_timestamp',
    type: 'timestamptz',
  })
  toTimestamp: string;

  @CreateDateColumn({
    transformer: dateColumnTransformer,
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt?: string;

  @UpdateDateColumn({
    transformer: dateColumnTransformer,
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt?: string;

  @DeleteDateColumn({
    transformer: dateColumnTransformer,
    name: 'removed_at',
    type: 'timestamptz',
  })
  removedAt?: string;
}
