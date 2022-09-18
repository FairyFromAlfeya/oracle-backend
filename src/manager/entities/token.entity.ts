import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { dateColumnTransformer } from '../../utils';
import { Pair } from './pair.entity';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Index()
  @Column()
  address: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column('integer')
  decimals: number;

  @ManyToMany(() => Pair, (pair) => pair.tokens)
  pairs: Pair[];

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
