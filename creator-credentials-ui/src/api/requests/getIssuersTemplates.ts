import { VerifiedCredentialsTemplate } from '@/shared/typings/Templates';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosRequestConfig } from '../axiosNest';

export type GetIssuersTemplatesPayload = never;

export type GetIssuersTemplatesResponse = {
  templates: VerifiedCredentialsTemplate[];
};

export const getIssuersTemplates = (
  token: string,
  config?: Omit<AxiosRequestConfig, 'params'>,
) =>
  axios.get<GetIssuersTemplatesResponse>('/v1/templates/issuer', {
    ...getHeaders(token),
    ...config,
  });
