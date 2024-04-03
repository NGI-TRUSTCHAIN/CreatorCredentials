import { VerifiedCredentialsTemplate } from '@/shared/typings/Templates';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosRequestConfig } from '../axiosNest';

export type GetCreatorsRequestableTemplatesPayload = never;

export type GetCreatorsRequestableTemplatesResponse = {
  templates: VerifiedCredentialsTemplate[];
};

export const getCreatorsRequestableTemplates = (
  token: string,
  config?: Omit<AxiosRequestConfig, 'params'>,
) =>
  axios.get<GetCreatorsRequestableTemplatesResponse>('/v1/templates/creator', {
    ...getHeaders(token),
    ...config,
  });
