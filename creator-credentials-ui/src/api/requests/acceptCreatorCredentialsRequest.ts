import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type AcceptCreatorCredentialsRequestPayload = {
  creatorId: string;
};

export type AcceptCreatorCredentialsRequestResponse = never;

export const acceptCreatorCredentialsRequest = (
  { creatorId }: AcceptCreatorCredentialsRequestPayload,
  token: string,
) =>
  axios.post<
    AcceptCreatorCredentialsRequestPayload,
    AxiosResponse<
      AcceptCreatorCredentialsRequestResponse,
      AcceptCreatorCredentialsRequestPayload
    >
  >(
    `/v1/users/creators/${creatorId}/credentials/accept`,
    {},
    getHeaders(token),
  );
