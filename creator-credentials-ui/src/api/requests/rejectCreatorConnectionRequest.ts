import axios, { AxiosResponse } from '@/api/axiosNest';

export type RejectCreatorConnectionRequestPayload = {
  creatorId: string;
};

export type RejectCreatorConnectionRequestResponse = never;

export const rejectCreatorConnectionRequest = ({
  creatorId,
}: RejectCreatorConnectionRequestPayload) =>
  axios.post<
    RejectCreatorConnectionRequestPayload,
    AxiosResponse<
      RejectCreatorConnectionRequestResponse,
      RejectCreatorConnectionRequestPayload
    >
  >(`/v1/mocks/issuer/creators/reject`, { creatorId });
