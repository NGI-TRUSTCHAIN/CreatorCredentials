import { MOCK_ISSUER_CREDENTIALS } from 'src/mocks/mocks.constants';
import { CredentialType } from 'src/shared/typings/CredentialType';
import { CredentialVerificationStatus } from 'src/shared/typings/CredentialVerificationStatus';
import { MembershipCredential } from 'src/shared/typings/Credentials';
import { IssuerWithVerifiedCredentials } from 'src/shared/typings/Issuer';
import { IssuerConnectionStatus } from 'src/shared/typings/IssuerConnectionStatus';

export const AVAILABLE_CREDENTIALS: MembershipCredential[] = [
  {
    id: '1',
    type: CredentialType.Member,
    data: {
      companyName: 'Liccium B.V.',
      requirements: 'Info about requirements',
    },
    status: CredentialVerificationStatus.Success,
  },
];

export const LicciumIssuer: IssuerWithVerifiedCredentials = {
  id: '10',
  name: 'Liccium B.V.',
  description: `Liccium helps creators to inseparably bind public and verifiable claims to their content.`,
  imageUrl: '/images/liccium.svg',
  data: {
    domain: 'liccium.com',
    requirements: 'Info about requirements',
  },
  fees: false,
  status: IssuerConnectionStatus.Connected,
  vcs: AVAILABLE_CREDENTIALS,
};
