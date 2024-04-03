import {
  Connection,
  ConnectionStatus,
} from 'src/connections/connection.entity';
import { User } from './user.entity';
import { Creator } from 'src/shared/typings/Creator';
import { CredentialVerificationStatus } from 'src/shared/typings/CredentialVerificationStatus';
import { CredentialType } from 'src/shared/typings/CredentialType';
import { CreatorVerificationStatus } from 'src/shared/typings/CreatorVerificationStatus';

export function mapIssuerConnectionToCreator(
  connection: Connection,
  user: User,
): Creator {
  const creds = user.credentials;
  let email: string = '';
  let domain: string;
  let walletAddress: string;
  creds.forEach((c) => {
    if (c.credentialStatus === CredentialVerificationStatus.Success) {
      switch (c.credentialType) {
        case CredentialType.EMail:
          email = c.email;
          break;
        case CredentialType.Domain:
          domain = c.email;
          break;
        case CredentialType.Wallet:
          walletAddress = c.email;
          break;
      }
    }
  });

  const status =
    connection?.status === ConnectionStatus.Accepted
      ? CreatorVerificationStatus.Accepted
      : CreatorVerificationStatus.Pending;

  return {
    id: connection?.creatorId.toString(),
    imageUrl: '/images/mock-creator-image.png',
    title: email, // TO DO change this to kind of title of creator(user)
    credentials: {
      email,
      walletAddress,
      domain,
    },
    status,
  };
}
