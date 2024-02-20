import axios, { AxiosResponse } from '@/api/axiosNest';
import { CredentialType } from '@/shared/typings/CredentialType';

export type SendCredentialsRequestPayload = {
  credentials: CredentialType[];
  issuerId: string;
};

export type SendCredentialsRequestResponse = never;

export const sendCredentialsRequest = (
  payload: SendCredentialsRequestPayload,
) =>
  axios.post<
    SendCredentialsRequestPayload,
    AxiosResponse<SendCredentialsRequestResponse, SendCredentialsRequestPayload>
  >(`/v1/mocks/creator/credentials/request`, payload);
