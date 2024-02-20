import { Issuer } from '@/shared/typings/Issuer';
import axios from '../axiosNest';

export type GetCreatorIssuersResponse = {
  issuers: Issuer[];
};

export const getCreatorIssuers = () =>
  axios.get<GetCreatorIssuersResponse>('/v1/mocks/creator/issuers');
