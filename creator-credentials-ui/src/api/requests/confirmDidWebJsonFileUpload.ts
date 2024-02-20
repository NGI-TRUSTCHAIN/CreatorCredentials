import axios, { AxiosResponse } from '@/api/axiosNest';

export type ConfirmDidWebJsonFileUploadPayload = never;

export type ConfirmDidWebJsonFileUploadResponse = never;

export const confirmDidWebJsonFileUpload = () =>
  axios.post<
    ConfirmDidWebJsonFileUploadPayload,
    AxiosResponse<
      ConfirmDidWebJsonFileUploadResponse,
      ConfirmDidWebJsonFileUploadPayload
    >
  >('/v1/mocks/verification/did-web/confirm-upload');
