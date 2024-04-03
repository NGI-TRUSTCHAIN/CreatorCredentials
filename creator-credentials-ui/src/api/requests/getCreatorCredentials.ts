import { CreatorCredentials } from '@/shared/typings/Credentials';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosRequestConfig } from '../axiosNest';

export type GetCreatorCredentialsResponse = CreatorCredentials;

export const getCreatorCredentials = (
  token: string,
  config?: AxiosRequestConfig,
) =>
  axios
    .get<GetCreatorCredentialsResponse>('/v1/credentials/creator', {
      ...config,
      ...getHeaders(token),
    })
    .then((res) => res.data);
