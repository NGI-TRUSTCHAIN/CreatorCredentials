import { CreatorCredentials } from '@/shared/typings/Credentials';
import axios, { AxiosRequestConfig } from '../axiosNest';

export type GetCreatorCredentialsResponse = CreatorCredentials;

export const getCreatorCredentials = (config?: AxiosRequestConfig) =>
  axios.get<GetCreatorCredentialsResponse>(
    '/v1/mocks/users/credentials',
    config,
  );
