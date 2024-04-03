import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type RevokeCreatorConnectionRequestPayload = {
  creatorId: string;
};

export type RevokeCreatorConnectionRequestResponse = never;

export const revokeCreatorConnectionRequest = (
  { creatorId }: RevokeCreatorConnectionRequestPayload,
  token: string,
) =>
  axios.post<
    RevokeCreatorConnectionRequestPayload,
    AxiosResponse<
      RevokeCreatorConnectionRequestResponse,
      RevokeCreatorConnectionRequestPayload
    >
  >(`/v1/users/creators/${creatorId}/revoke`, {}, getHeaders(token));
