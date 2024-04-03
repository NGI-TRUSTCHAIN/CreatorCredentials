import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getCredentialsRequestDetails,
  GetCredentialsRequestDetailsResponse,
} from '../requests/getCredentialsRequestDetails';

export const useCredentialsRequestDetails = (
  creatorId: string,
  options?: Omit<
    UseQueryOptions<GetCredentialsRequestDetailsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetCredentialsRequestDetailsResponse>(
    [QueryKeys.credentialsRequestDetails, creatorId],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCredentialsRequestDetails call');
      }
      return getCredentialsRequestDetails(creatorId, token).then(
        (res) => res.data,
      );
    },
    {
      ...options,
    },
  );
};
