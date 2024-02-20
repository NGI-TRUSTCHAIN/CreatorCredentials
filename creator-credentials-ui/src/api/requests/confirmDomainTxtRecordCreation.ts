import axios, { AxiosResponse } from '@/api/axiosNest';

export type ConfirmDomainTxtRecordCreationPayload = never;

export type ConfirmDomainTxtRecordCreationResponse = never;

export const confirmDomainTxtRecordCreation = () =>
  axios.post<
    ConfirmDomainTxtRecordCreationPayload,
    AxiosResponse<
      ConfirmDomainTxtRecordCreationResponse,
      ConfirmDomainTxtRecordCreationPayload
    >
  >('/v1/mocks/verification/domain/confirm');
