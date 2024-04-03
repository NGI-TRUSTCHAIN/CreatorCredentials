// template.entity.ts

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Credential } from 'src/credentials/credential.entity';
import { CredentialTemplateType } from 'src/shared/typings/CredentialTemplateType';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    enum: CredentialTemplateType,
    name: 'template_type',
    type: 'enum',
    nullable: false,
    unique: true,
    default: CredentialTemplateType.Member,
  })
  templateType: CredentialTemplateType;

  @ManyToMany(() => User, (user) => user.templates)
  @JoinTable({
    name: 'users_templates',
    joinColumn: { name: 'template_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  // OneToOne relation with Credential
  @OneToMany(() => Credential, (credentials) => credentials.template)
  credentials: Credential[];
}
