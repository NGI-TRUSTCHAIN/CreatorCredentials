import {
  DidWebCredential,
  DomainCredential,
  EmailCredential,
  MembershipCredential,
  VerifiedCredentialsUnion,
  WalletCredential,
} from 'src/shared/typings/Credentials';
import { Credential } from './credential.entity';
import { CredentialType } from 'src/shared/typings/CredentialType';
import { NotFoundException } from '@nestjs/common';

const DEFAUTL_COMPANY_NAME = 'Liccium B.V.';
export function formatCredentialForUnion(
  credential: Credential,
): VerifiedCredentialsUnion {
  switch (credential.credentialType) {
    case CredentialType.EMail:
      return formatEmailCredential(credential);
    case CredentialType.DidWeb:
      return formatDidWebCredential(credential);
    case CredentialType.Wallet:
      return formatWalletCredential(credential);
    case CredentialType.Domain:
      return formatDomainCredential(credential);
    case CredentialType.Member:
      return formatMemberCredential(credential);
    default:
      throw new NotFoundException(
        'CredentialType is not defined properly for credential.',
      );
  }
}

export function formatEmailCredential(credential: Credential): EmailCredential {
  return {
    id: credential.id.toString(),
    status: credential.credentialStatus,
    type: CredentialType.EMail,
    data: {
      address: credential.email || 'wrong',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
      credentialObject: {
        proof: {
          type: 'JwtProof2020',
          jwt: credential.token,
        },
        ...credential.credentialObject,
        userId: credential.userId,
      },
    },
  };
}

export function formatWalletCredential(
  credential: Credential,
): WalletCredential {
  return {
    id: credential.id.toString(),
    status: credential.credentialStatus,
    type: CredentialType.Wallet,
    data: {
      address: credential.email || 'wrong',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
      credentialObject: {
        proof: {
          type: 'JwtProof2020',
          jwt: credential.token,
        },
        ...credential.credentialObject,
        userId: credential.userId,
      },
    },
  };
}

export function formatDomainCredential(
  credential: Credential,
): DomainCredential {
  return {
    id: credential.id.toString(),
    status: credential.credentialStatus,
    type: CredentialType.Domain,
    data: {
      domain: credential.email || 'wrong',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
      credentialObject: {
        proof: {
          type: 'JwtProof2020',
          jwt: credential.token,
        },
        ...credential.credentialObject,
        userId: credential.userId,
      },
    },
  };
}

export function formatDidWebCredential(
  credential: Credential,
): DidWebCredential {
  return {
    id: credential.id.toString(),
    status: credential.credentialStatus,
    type: CredentialType.DidWeb,
    data: {
      domain: credential.email || 'wrong',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
      credentialObject: {
        proof: {
          type: 'JwtProof2020',
          jwt: credential.token,
        },
        ...credential.credentialObject,
        userId: credential.userId,
      },
    },
  };
}

export function formatMemberCredential(
  credential: Credential,
): MembershipCredential {
  return {
    id: credential.id.toString(),
    status: credential.credentialStatus,
    type: CredentialType.Member,
    data: {
      validity: credential.value || 'wrong',
      companyName: DEFAUTL_COMPANY_NAME,
      requirements: 'Info about requirements',
      credentialObject: {
        proof: {
          type: 'JwtProof2020',
          jwt: credential.token,
        },
        ...credential.credentialObject,
        userId: credential.userId,
      },
    },
  };
}
