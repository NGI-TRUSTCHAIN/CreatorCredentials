import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import axios, { AxiosRequestConfig } from '../axiosNest';

export type GetRequestableCredentialsPayload = never;

export type GetRequestableCredentialsResponse = {
  credentials: VerifiedCredentialsUnion[];
};

export const getRequestableCredentials = (
  issuerId?: string,
  config?: Omit<AxiosRequestConfig, 'params'>,
) =>
  axios.get<GetRequestableCredentialsResponse>(
    '/v1/mocks/creator/credentials',
    {
      params: {
        issuerId,
      },
      ...config,
    },
  );
