import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { Creator } from '@/shared/typings/Creator';
import axios from '../axiosNest';

export type GetCredentialsRequestDetailsResponse = {
  creator: Creator;
  credentials: VerifiedCredentialsUnion[];
};

export const getCredentialsRequestDetails = (creatorId: string) =>
  axios.get<GetCredentialsRequestDetailsResponse>(
    `/v1/mocks/issuer/creators/${creatorId}`,
  );
