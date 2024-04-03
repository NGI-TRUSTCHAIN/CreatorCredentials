import { Issuer } from '@/shared/typings/Issuer';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios from '../axiosNest';

export type GetCreatorIssuersResponse = {
  issuers: Issuer[];
};

export const getCreatorIssuers = (token: string) =>
  axios.get<GetCreatorIssuersResponse>('/v1/users/issuers', getHeaders(token));
