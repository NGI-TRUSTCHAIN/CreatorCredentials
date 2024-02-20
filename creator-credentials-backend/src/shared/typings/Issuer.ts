import { VerifiedCredentialsUnion } from './Credentials';
import { IssuerConnectionStatus } from './IssuerConnectionStatus';

export type Issuer = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: IssuerConnectionStatus;
  data: Record<string, string>;
  fees: boolean;
  additionalVerificationSteps?: boolean;
};

export type IssuerWithVerifiedCredentials = Issuer & {
  vcs: VerifiedCredentialsUnion[];
};
