import axios, { AxiosResponse } from '@/api/axiosNest';

export type AcceptCreatorConnectionRequestPayload = {
  creatorId: string;
};

export type AcceptCreatorConnectionRequestResponse = never;

export const acceptCreatorConnectionRequest = ({
  creatorId,
}: AcceptCreatorConnectionRequestPayload) =>
  axios.post<
    AcceptCreatorConnectionRequestPayload,
    AxiosResponse<
      AcceptCreatorConnectionRequestResponse,
      AcceptCreatorConnectionRequestPayload
    >
  >(`/v1/mocks/issuer/creators/accept`, { creatorId });
