import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Credential } from 'src/credentials/credential.entity';
export enum ClerkRole {
  Issuer = 'issuer',
  Creator = 'creator',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'clerk_id',
    unique: true,
    nullable: false,
  })
  clerkId: string;

  @Column({
    name: 'clerk_role',
    type: 'enum',
    enum: ClerkRole,
    nullable: false,
    default: ClerkRole.Creator,
  })
  clerkRole: ClerkRole;

  @OneToMany(() => Credential, (credential) => credential.user)
  credentials: Credential[];

  //TIMESTAMPS

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
