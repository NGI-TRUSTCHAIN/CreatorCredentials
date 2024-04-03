import { getHeaders } from '@/shared/utils/tokenHeader';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import axios from '../axiosNest';

export type GetIssuersCredentialsSearchParams = {
  status: CredentialVerificationStatus;
};

export type GetIssuersCredentialsResponse = {
  credentials: VerifiedCredentialsUnion[];
};

export const getIssuersCredentials = (
  params: GetIssuersCredentialsSearchParams,
  token: string,
) =>
  axios.get<GetIssuersCredentialsResponse>('/v1/credentials/issuers', {
    params,
    ...getHeaders(token),
  });
