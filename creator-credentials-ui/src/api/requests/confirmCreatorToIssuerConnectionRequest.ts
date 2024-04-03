import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type ConfirmCreatorToIssuerConnectionRequestPayload = {
  issuerId: string;
};

export type ConfirmCreatorToIssuerConnectionRequestResponse = never;

export const confirmCreatorToIssuerConnectionRequest = (
  { issuerId }: ConfirmCreatorToIssuerConnectionRequestPayload,
  token: string,
) =>
  axios.post<
    ConfirmCreatorToIssuerConnectionRequestPayload,
    AxiosResponse<
      ConfirmCreatorToIssuerConnectionRequestResponse,
      ConfirmCreatorToIssuerConnectionRequestPayload
    >
  >(`/v1/users/issuers/${issuerId}/confirm-request`, {}, getHeaders(token));
