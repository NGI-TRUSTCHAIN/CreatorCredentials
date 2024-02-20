import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateEmailCredentialDto } from './dto/create-credential.dto';
import { Credential, CredentialType } from './credential.entity';
import * as jose from 'jose';
import { User } from 'src/users/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { formatCredential } from './credentials.utils';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialsRepository: Repository<Credential>,
  ) {}

  async createEmailCredential(
    createCredentialDto: CreateEmailCredentialDto,
    user: User,
  ): Promise<Credential> {
    const credentialsHost = 'creatorcredentials.dev';

    const currentEmailCredential = await this.credentialsRepository.findOne({
      where: { credentialType: CredentialType.EMail, userId: user.id },
    });

    if (currentEmailCredential) {
      throw new ConflictException(
        'Email credential already exists for this user.',
      );
    }

    const now = new Date();
    const end = new Date();
    end.setFullYear(end.getFullYear() + 1);

    const credentialObject = {
      '@context': ['https://www.w3.org/ns/credentials/v2'],
      id: `urn:uuid:${uuidv4()}`,
      type: [
        'VerifiableCredential',
        'VerifiableAttestation',
        'VerifiableEmail',
      ],
      issuer: `did:web:${credentialsHost}`,
      validFrom: now.toISOString(),
      validUntil: end.toISOString(),
      credentialSubject: {
        id: `did:key:${createCredentialDto.did}`,
        email: createCredentialDto.email,
      },
      credentialSchema: [
        {
          id: 'https://github.com/creatorcredentials/schemas/email.json',
          type: 'JsonSchema',
        },
      ],
      termsOfUse: {
        type: 'PresentationPolicy',
        confidentialityLevel: 'restricted',
        pii: 'sensitive',
      },
    };

    const ecPrivateKey = await jose.importJWK(
      {
        kty: 'EC',
        crv: 'P-256',
        d: process.env.SIGNATURE_KEY_D,
        x: process.env.SIGNATURE_KEY_X,
        y: process.env.SIGNATURE_KEY_Y,
      },
      'ES256',
    );
    const jws = await new jose.CompactSign(
      new TextEncoder().encode(JSON.stringify(credentialObject)),
    )
      .setProtectedHeader({ alg: 'ES256' })
      .sign(ecPrivateKey);

    const credential = await this.credentialsRepository.create({
      email: createCredentialDto.email,
      credentialType: CredentialType.EMail,
      credentialObject,
      token: jws,
      user,
    });

    await this.credentialsRepository.save(credential, { reload: true });

    const result = credential.credentialObject;
    result.proof = {
      type: 'JwtProof2020',
      jwt: jws,
    };
    return result;
  }

  async getById(id: number, clerkId: string): Promise<Credential> {
    return this.credentialsRepository.findOne({
      where: { id, user: { clerkId } },
    });
  }

  async getEmailCredentialOfUser(user: User): Promise<Credential[]> {
    const credential = await this.credentialsRepository.findOne({
      where: { userId: user.id, credentialType: CredentialType.EMail },
    });

    return formatCredential(credential);
  }

  async getAllCredentialsOfUser(user: User): Promise<Credential[]> {
    const credentials = await this.credentialsRepository.find({
      where: { userId: user.id },
    });

    return credentials.map(formatCredential);
  }

  async removeEmailCredential(user: User): Promise<DeleteResult> {
    const credential = await this.credentialsRepository.findOne({
      where: { userId: user.id, credentialType: CredentialType.EMail },
    });

    return this.credentialsRepository.delete({ id: credential?.id });
  }
}
