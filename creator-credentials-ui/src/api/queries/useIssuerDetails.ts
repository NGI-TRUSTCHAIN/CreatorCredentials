import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerDetailsWithCredentials,
  GetIssuerDetailsWithCredentialsPayload,
  GetIssuerDetailsWithCredentialsResponse,
} from '../requests/getIssuerDetailsWithCredentials';

export const useIssuerDetailsWithCredentials = (
  { issuerId }: GetIssuerDetailsWithCredentialsPayload,
  options?: Omit<
    UseQueryOptions<GetIssuerDetailsWithCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetIssuerDetailsWithCredentialsResponse>(
    [QueryKeys.creatorIssuerDetails, issuerId],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useIssuerDetailsWithCredentials call');
      }
      return getIssuerDetailsWithCredentials({ issuerId }, token).then(
        (res) => res.data,
      );
    },
    {
      ...options,
    },
  );
};
