import axios, { AxiosResponse } from '@/api/axiosNest';
import { VerifiedCredentialsTemplate } from '@/shared/typings/Templates';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type SendCredentialsRequestPayload = {
  templates: Omit<VerifiedCredentialsTemplate, 'id'>[];
  issuerId: string;
};

export type SendCredentialsRequestResponse = never;

export const sendCredentialsRequest = (
  payload: SendCredentialsRequestPayload,
  token: string,
) =>
  axios.post<
    SendCredentialsRequestPayload,
    AxiosResponse<SendCredentialsRequestResponse, SendCredentialsRequestPayload>
  >(`/v1/credentials/request`, payload, getHeaders(token));
