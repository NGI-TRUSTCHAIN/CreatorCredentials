import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type RejectCreatorConnectionRequestPayload = {
  creatorId: string;
};

export type RejectCreatorConnectionRequestResponse = never;

export const rejectCreatorConnectionRequest = (
  { creatorId }: RejectCreatorConnectionRequestPayload,
  token: string,
) =>
  axios.post<
    RejectCreatorConnectionRequestPayload,
    AxiosResponse<
      RejectCreatorConnectionRequestResponse,
      RejectCreatorConnectionRequestPayload
    >
  >(`/v1/users/creators/${creatorId}/reject`, {}, getHeaders(token));
