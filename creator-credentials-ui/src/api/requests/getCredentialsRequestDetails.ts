import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { Creator } from '@/shared/typings/Creator';
import { getHeaders } from '@/shared/utils/tokenHeader';
import axios from '../axiosNest';

export type GetCredentialsRequestDetailsResponse = {
  creator: Creator;
  credentials: VerifiedCredentialsUnion[];
};

export const getCredentialsRequestDetails = (
  creatorId: string,
  token: string,
) =>
  axios.get<GetCredentialsRequestDetailsResponse>(
    `/v1/users/creators/${creatorId}`,
    getHeaders(token),
  );
