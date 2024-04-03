import { IssuerCredentials } from '@/shared/typings/Credentials';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosRequestConfig } from '../axiosNest';

export type GetIssuerCredentialsResponse = IssuerCredentials;

export const getIssuerCredentials = (
  token: string,
  config?: AxiosRequestConfig,
) =>
  axios
    .get<GetIssuerCredentialsResponse>('/v1/credentials/issuer', {
      ...config,
      ...getHeaders(token),
    })
    .then((res) => res.data);
