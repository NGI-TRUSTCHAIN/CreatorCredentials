import { Creator } from '@/shared/typings/Creator';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios from '../axiosNest';

export type GetIssuerCreatorsSearchParams = {
  status: CreatorVerificationStatus;
};

export type GetIssuerCreatorsResponse = {
  creators: Creator[];
};

export const getIssuerCreators = (
  params: GetIssuerCreatorsSearchParams,
  token: string,
) =>
  axios.get<GetIssuerCreatorsResponse>('/v1/users/creators', {
    params,
    ...getHeaders(token),
  });
