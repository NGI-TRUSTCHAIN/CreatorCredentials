import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type RejectCredentialsIssuanceRequestPayload = {
  credentialId: string;
};

export type RejectCredentialsIssuanceRequestResponse = never;

export const rejectCredentialsIssuanceRequest = (
  { credentialId }: RejectCredentialsIssuanceRequestPayload,
  token: string,
) =>
  axios.post<
    RejectCredentialsIssuanceRequestPayload,
    AxiosResponse<
      RejectCredentialsIssuanceRequestResponse,
      RejectCredentialsIssuanceRequestPayload
    >
  >(`/v1/credentials/${credentialId}/reject`, {}, getHeaders(token));
