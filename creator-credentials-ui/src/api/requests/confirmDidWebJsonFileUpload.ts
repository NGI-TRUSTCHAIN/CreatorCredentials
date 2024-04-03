import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type ConfirmDidWebJsonFileUploadPayload = never;

export type ConfirmDidWebJsonFileUploadResponse = never;

export const confirmDidWebJsonFileUpload = (token: string) =>
  axios.post<
    ConfirmDidWebJsonFileUploadPayload,
    AxiosResponse<
      ConfirmDidWebJsonFileUploadResponse,
      ConfirmDidWebJsonFileUploadPayload
    >
  >('/v1/users/verification/did-web/confirm', {}, getHeaders(token));
