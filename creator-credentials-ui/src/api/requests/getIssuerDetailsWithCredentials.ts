import { IssuerWithVerifiedCredentials } from '@/shared/typings/Issuer';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios from '../axiosNest';

export type GetIssuerDetailsWithCredentialsPayload = {
  issuerId: string;
};

export type GetIssuerDetailsWithCredentialsResponse = {
  issuer: IssuerWithVerifiedCredentials;
};

export const getIssuerDetailsWithCredentials = (
  { issuerId }: GetIssuerDetailsWithCredentialsPayload,
  token: string,
) =>
  axios.get<GetIssuerDetailsWithCredentialsResponse>(
    `/v1/users/issuers/${issuerId}`,
    getHeaders(token),
  );
