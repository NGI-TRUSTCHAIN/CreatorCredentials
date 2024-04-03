import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Credential } from 'src/credentials/credential.entity';
import { Exclude } from 'class-transformer';
import { Connection } from 'src/connections/connection.entity';
import { CredentialType } from 'src/shared/typings/CredentialType';
import { Template } from 'src/templates/template.entity';
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

  @Exclude()
  @Column({ name: 'nonce', default: '' })
  nonce: string;

  @ManyToMany(() => Template, (template) => template.users, { eager: true })
  @JoinTable({
    name: 'users_templates',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'template_id',
      referencedColumnName: 'id',
    },
  })
  templates: Template[];

  @Column({
    name: 'clerk_role',
    type: 'enum',
    enum: ClerkRole,
    nullable: false,
    default: ClerkRole.Creator,
  })
  clerkRole: ClerkRole;

  @OneToMany(() => Credential, (credential) => credential.user, { eager: true })
  credentials: Credential[];

  @OneToMany(() => Credential, (credential) => credential.issuer, {
    eager: true,
  })
  issuedCredentials: Credential[];

  @Column({ unique: true, name: 'public_address', nullable: true })
  publicAddress: string;

  @Column({
    name: 'description',
    nullable: false,
    default: 'This is default creator credentials description.',
  })
  description: string;

  @Column({ name: 'name', nullable: false, default: 'Default name' })
  name: string;

  @Column({ name: 'image_url', nullable: false, default: '/images/brand.svg' })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: CredentialType,
    name: 'credentials_to_issue',
    nullable: false,
    default: [],
    array: true,
  })
  credentialsToIssue: CredentialType[];

  @Column({ unique: true, name: 'domain', nullable: true })
  domain: string;

  @Exclude()
  @Column({ name: 'domain_record', nullable: true })
  domainRecord: string;

  @Column({
    name: 'domain_pending_verifcation',
    nullable: false,
    default: false,
  })
  domainPendingVerifcation: boolean;

  @Column({ unique: true, name: 'did_key', nullable: false })
  didKey: string;

  @Column({ unique: true, name: 'did_web', nullable: true })
  didWeb: string;

  @Exclude()
  @Column({ name: 'did_web_well_known', nullable: true, type: 'jsonb' })
  didWebWellKnown: DidWebWellKnown;

  @Column({
    name: 'did_web_pending_verifcation',
    nullable: false,
    default: false,
  })
  didWebPendingVerifcation: boolean;

  @OneToMany(() => Connection, (connection) => connection.issuer, {
    eager: true,
  })
  issuedConnections: Connection[];

  @OneToMany(() => Connection, (connection) => connection.creator, {
    eager: true,
  })
  createdConnections: Connection[];

  //TIMESTAMPS
  @Exclude()
  @Column({
    name: 'did_web_well_known_changed_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  didWebWellKnownChangedAt!: Date;

  @Exclude()
  @Column({
    name: 'domain_record_changed_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  domainRecordChangedAt!: Date;

  @Exclude()
  @Column({
    name: 'nonce_changed_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  nonceChangedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export type VerificationMethod = {
  id: string;
  type: string;
  controller: string;
  publicKeyJwk: {
    kty: string;
    crv: string;
    x: string;
  };
};

export type DidWebWellKnown = {
  '@context': string[];
  id: string;
  value: string;
  verificationMethod: VerificationMethod[];
  authentication: string[];
};
