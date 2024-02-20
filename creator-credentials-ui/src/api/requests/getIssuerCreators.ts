import { Creator } from '@/shared/typings/Creator';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import axios from '../axiosNest';

export type GetIssuerCreatorsSearchParams = {
  search: string;
  status: CreatorVerificationStatus;
};

export type GetIssuerCreatorsResponse = {
  creators: Creator[];
};

export const getIssuerCreators = (params: GetIssuerCreatorsSearchParams) =>
  axios.get<GetIssuerCreatorsResponse>('/v1/mocks/issuer/creators', {
    params,
  });
