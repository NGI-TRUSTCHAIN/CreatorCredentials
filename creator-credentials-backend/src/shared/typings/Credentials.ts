import { CredentialType } from './CredentialType';
import { CredentialVerificationStatus } from './CredentialVerificationStatus';

type BaseCredential<T extends CredentialType, D extends object> = {
  id: string;
  status?: CredentialVerificationStatus;
  type: T;
  data: D;
};

export type EmailCredential = BaseCredential<
  CredentialType.Email,
  {
    address: string;
    requirements?: string;
    companyName?: string;
    // eslint-disable-next-line
    credentialObject?: any;
  }
>;

export type WalletCredential = BaseCredential<
  CredentialType.Wallet,
  {
    address: string;
    companyName?: string;
    requirements?: string;
    // eslint-disable-next-line
    credentialObject?: any;
  }
>;

export type DomainCredential = BaseCredential<
  CredentialType.Domain,
  {
    domain: string;
    // eslint-disable-next-line
    credentialObject?: any;
  }
>;

export type MembershipCredential = BaseCredential<
  CredentialType.Member,
  {
    companyName?: string;
    requirements?: string;
    validity?: string;
    // eslint-disable-next-line
    credentialObject?: any;
  }
>;

export type DidWebCredential = BaseCredential<
  CredentialType.DidWeb,
  {
    domain: string;
    // eslint-disable-next-line
    credentialObject?: any;
  }
>;

export type VerifiedCredentialsUnion =
  | EmailCredential
  | WalletCredential
  | DomainCredential
  | MembershipCredential
  | DidWebCredential;

export type CreatorCredentials = {
  email: EmailCredential;
  metaMask: WalletCredential | null;
  domain: DomainCredential | null;
  membership: MembershipCredential[];
};

export type IssuerCredentials = {
  domain: DomainCredential;
  didWeb: DidWebCredential;
  membership: MembershipCredential[];
};
