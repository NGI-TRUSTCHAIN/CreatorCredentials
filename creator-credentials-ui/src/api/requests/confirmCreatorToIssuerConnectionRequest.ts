import axios, { AxiosResponse } from '@/api/axiosNest';

export type ConfirmCreatorToIssuerConnectionRequestPayload = {
  issuerId: string;
};

export type ConfirmCreatorToIssuerConnectionRequestResponse = never;

export const confirmCreatorToIssuerConnectionRequest = ({
  issuerId,
}: ConfirmCreatorToIssuerConnectionRequestPayload) =>
  axios.post<
    ConfirmCreatorToIssuerConnectionRequestPayload,
    AxiosResponse<
      ConfirmCreatorToIssuerConnectionRequestResponse,
      ConfirmCreatorToIssuerConnectionRequestPayload
    >
  >(`/v1/mocks/creator/issuers/${issuerId}/confirm-request`);
