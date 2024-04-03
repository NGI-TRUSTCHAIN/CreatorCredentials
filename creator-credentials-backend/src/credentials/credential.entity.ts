import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { CredentialType } from 'src/shared/typings/CredentialType';
import { CredentialVerificationStatus } from 'src/shared/typings/CredentialVerificationStatus';
import { Template } from 'src/templates/template.entity';

@Entity()
export class Credential extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string; //TODO: rename to credential value with all data transfer

  @Column({ nullable: false })
  token: string;

  @Column({ type: 'jsonb', nullable: false })
  credentialObject: any;

  @Exclude()
  @ManyToOne(() => User, (user) => user.credentials, {
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'issuer_id' })
  issuer: User;

  @Exclude()
  @Column({ name: 'issuer_id', nullable: true })
  issuerId: number;

  @Column({ nullable: true })
  value: string;

  @Exclude()
  @ManyToOne(() => User, (user) => user.credentials, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  // Many Credentials belong to one Template
  @ManyToOne(() => Template, (template) => template.credentials)
  @JoinColumn({ name: 'template_id' })
  template: Template;

  @Column({
    name: 'credential_type',
    type: 'enum',
    enum: CredentialType,
    nullable: false,
    default: CredentialType.EMail,
  })
  credentialType: CredentialType;

  @Column({
    name: 'credential_status',
    type: 'enum',
    enum: CredentialVerificationStatus,
    nullable: false,
    default: CredentialVerificationStatus.Pending,
  })
  credentialStatus: CredentialVerificationStatus;

  //TIMESTAMPS

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
