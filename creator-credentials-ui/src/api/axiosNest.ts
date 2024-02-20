/* eslint-disable no-restricted-imports */
import * as https from 'https';
import axiosStatic, { AxiosError, InternalAxiosRequestConfig } from 'axios';
// import { getSession } from 'next-auth/react';
import { config } from '@/shared/constants/config';

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  // if (!config.headers.Authorization) {
  //   const session = await getSession();
  //   config.headers.Authorization = `Bearer ${session?.backendTokens?.accessToken}`;
  // }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const nestInstance = axiosStatic.create({
  baseURL: config.NEST_API_URL,
  httpAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

nestInstance.interceptors.request.use(onRequest, onRequestError);

export default nestInstance;
export * from 'axios';
