import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosResponse } from '../axiosNest';

export type CreateTxtRecordForDomainPayload = {
  domain: string;
};

export type CreateTxtRecordForDomainResponse = {
  txtRecord: string;
};

export const createTxtRecordForDomain = (token: string, domain: string) =>
  axios.post<
    CreateTxtRecordForDomainPayload,
    AxiosResponse<
      CreateTxtRecordForDomainResponse,
      CreateTxtRecordForDomainPayload
    >
  >('/v1/users/verification/domain/txt-record', { domain }, getHeaders(token));
