import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { dateColumnTransformer } from '../../utils';
import { Token } from './token.entity';
import { Price } from './price.entity';
import { Twap } from './twap.entity';

@Entity({ name: 'pairs' })
export class Pair {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Index()
  @Column()
  address: string;

  @Column({ name: 'left_token', type: 'uuid' })
  leftToken: string;

  @Column({ name: 'right_token', type: 'uuid' })
  rightToken: string;

  @Column('integer')
  scale: number;

  @ManyToMany(() => Token, (token) => token.pairs)
  @JoinTable()
  tokens: Token[];

  @OneToMany(() => Price, (price) => price.pair)
  prices: Price[];

  @OneToMany(() => Twap, (twap) => twap.pair)
  twaps: Twap[];

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
