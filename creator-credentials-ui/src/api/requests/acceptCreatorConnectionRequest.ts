import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type AcceptCreatorConnectionRequestPayload = {
  creatorId: string;
};

export type AcceptCreatorConnectionRequestResponse = never;

export const acceptCreatorConnectionRequest = (
  { creatorId }: AcceptCreatorConnectionRequestPayload,
  token: string,
) =>
  axios.post<
    AcceptCreatorConnectionRequestPayload,
    AxiosResponse<
      AcceptCreatorConnectionRequestResponse,
      AcceptCreatorConnectionRequestPayload
    >
  >(`/v1/users/creators/${creatorId}/accept`, {}, getHeaders(token));
