import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type AcceptCredentialsIssuanceRequestPayload = {
  credentialId: string;
};

export type AcceptCredentialsIssuanceRequestResponse = never;

export const acceptCredentialsIssuanceRequest = (
  { credentialId }: AcceptCredentialsIssuanceRequestPayload,
  token: string,
) =>
  axios.post<
    AcceptCredentialsIssuanceRequestPayload,
    AxiosResponse<
      AcceptCredentialsIssuanceRequestResponse,
      AcceptCredentialsIssuanceRequestPayload
    >
  >(`/v1/credentials/${credentialId}/accept`, {}, getHeaders(token));
