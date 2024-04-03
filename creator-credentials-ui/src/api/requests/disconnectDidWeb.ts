import axios, { AxiosResponse } from '@/api/axiosNest';
import { getHeaders } from '@/shared/utils/tokenHeader';

export type DisconnectDidWebPayload = void;

export type DisconnectDidWebResponse = never;

export const disconnectDidWeb = (token: string) =>
  axios.post<
    DisconnectDidWebPayload,
    AxiosResponse<DisconnectDidWebResponse, DisconnectDidWebPayload>
  >('/v1/users/did-web/disconnect', {}, getHeaders(token));
