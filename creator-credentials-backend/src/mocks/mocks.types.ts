import { Creator } from 'src/shared/typings/Creator';
import {
  CreatorCredentials,
  IssuerCredentials,
  VerifiedCredentialsUnion,
} from 'src/shared/typings/Credentials';
import {
  Issuer,
  IssuerWithVerifiedCredentials,
} from 'src/shared/typings/Issuer';
import { IssuerProfile } from 'src/shared/typings/IssuerProfile';

export type GetIssuerCreatorsResponse = {
  creators: Creator[];
};

export type GetCredentialsRequestDetailsResponse = {
  creator: Creator;
  credentials: VerifiedCredentialsUnion[];
};

export type GetIssuerDetailsWithCredentialsResponse = {
  issuer: IssuerWithVerifiedCredentials;
};

export type GetIssuerProfileResponse = IssuerProfile;

export type GetCreatorCredentialsResponse = CreatorCredentials;

export type GenerateMetaMaskNonceResponse = {
  nonce: string;
};

export type CreateTxtRecordForDomainResponse = {
  txtRecord: string;
};

export type CreateDidWebJsonFileResponse = {
  jsonFileContent: string;
};

export type GetIssuersBySelectedCredentialsResponse = {
  issuers: IssuerWithVerifiedCredentials[];
};

export type GetRequestableCredentialsResponse = {
  credentials: VerifiedCredentialsUnion[];
};
export type GetIssuerCredentialsResponse = {
  credentials: IssuerCredentials;
};

export type GetCreatorIssuersResponse = {
  issuers: Issuer[];
};
