import axios, { AxiosResponse } from '../axiosNest';

export type CreateTxtRecordForDomainPayload = {
  domain: string;
};

export type CreateTxtRecordForDomainResponse = {
  txtRecord: string;
};

export const createTxtRecordForDomain = (domain: string) =>
  axios.post<
    CreateTxtRecordForDomainPayload,
    AxiosResponse<
      CreateTxtRecordForDomainResponse,
      CreateTxtRecordForDomainPayload
    >
  >('/v1/mocks/verification/domain/txt-record', { domain });
