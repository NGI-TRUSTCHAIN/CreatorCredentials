// connection.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum ConnectionStatus {
  Requested = 'REQUESTED',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Revoked = 'REVOKED',
}

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.issuedConnections, {})
  @JoinColumn({ name: 'issuer_id' })
  issuer: User;

  @ManyToOne(() => User, (user) => user.createdConnections)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ name: 'issuer_id' })
  issuerId: number;
  @Column({ name: 'creator_id' })
  creatorId: number;

  @Column({
    type: 'enum',
    enum: ConnectionStatus,
    default: ConnectionStatus.Requested,
  })
  status: ConnectionStatus;
}
