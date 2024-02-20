import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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
) =>
  useQuery<GetCredentialsRequestDetailsResponse>(
    [QueryKeys.credentialsRequestDetails, creatorId],
    () => getCredentialsRequestDetails(creatorId).then((res) => res.data),
    {
      ...options,
    },
  );
