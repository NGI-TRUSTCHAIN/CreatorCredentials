import { getHeaders } from '@/shared/utils/tokenHeader';
import { IssuerWithVerifiedCredentials } from '@/shared/typings/Issuer';
import axios from '../axiosNest';

export type GetIssuersResponse = IssuerWithVerifiedCredentials[];

export const getIssuers = (token: string) =>
  axios.get<GetIssuersResponse>('/v1/users/issuers', getHeaders(token));
