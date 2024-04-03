import { getHeaders } from '@/shared/utils/tokenHeader';
import axios, { AxiosResponse } from '../axiosNest';

export type CreateDidWebJsonFilePayload = {
  didWeb: string;
};

export type CreateDidWebJsonFileResponse = {
  wellKnownJsonString: string;
};

export const createDidWebJsonFile = (
  token: string,
  payload: CreateDidWebJsonFilePayload,
) =>
  axios.post<
    CreateDidWebJsonFilePayload,
    AxiosResponse<CreateDidWebJsonFileResponse, CreateDidWebJsonFilePayload>
  >('/v1/users/verification/did-web/well-known', payload, getHeaders(token));
