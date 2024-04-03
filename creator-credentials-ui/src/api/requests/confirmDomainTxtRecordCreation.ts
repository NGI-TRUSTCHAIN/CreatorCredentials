import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type ConfirmDomainTxtRecordCreationPayload = never;

export type ConfirmDomainTxtRecordCreationResponse = never;

export const confirmDomainTxtRecordCreation = (token: string) =>
  axios.post<
    ConfirmDomainTxtRecordCreationPayload,
    AxiosResponse<
      ConfirmDomainTxtRecordCreationResponse,
      ConfirmDomainTxtRecordCreationPayload
    >
  >('/v1/users/verification/domain/confirm', {}, getHeaders(token));
