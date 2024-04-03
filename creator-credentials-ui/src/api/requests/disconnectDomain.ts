import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type DisconnectDomainPayload = void;

export type DisconnectDomainResponse = never;

export const disconnectDomain = (token: string) =>
  axios.post<
    DisconnectDomainPayload,
    AxiosResponse<DisconnectDomainResponse, DisconnectDomainPayload>
  >('/v1/users/domain/disconnect', {}, getHeaders(token));
