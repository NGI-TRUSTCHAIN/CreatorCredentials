import { IssuerWithVerifiedCredentials } from '@/shared/typings/Issuer';
import axios from '../axiosNest';

export type GetIssuerDetailsWithCredentialsPayload = {
  issuerId: string;
};

export type GetIssuerDetailsWithCredentialsResponse = {
  issuer: IssuerWithVerifiedCredentials;
};

export const getIssuerDetailsWithCredentials = ({
  issuerId,
}: GetIssuerDetailsWithCredentialsPayload) =>
  axios.get<GetIssuerDetailsWithCredentialsResponse>(
    `/v1/mocks/creator/issuers/${issuerId}`,
  );
