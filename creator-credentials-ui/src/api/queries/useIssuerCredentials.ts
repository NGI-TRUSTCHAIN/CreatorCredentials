import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerCredentials,
  GetIssuerCredentialsResponse,
} from '../requests/getIssuerCredentials';

export const useIssuerCredentials = (
  options?: Omit<
    UseQueryOptions<GetIssuerCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetIssuerCredentialsResponse>(
    [QueryKeys.issuerCredentials],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCreatorCredentials call');
      }
      return getIssuerCredentials(token);
    },
    {
      refetchInterval: 60000,
      ...options,
    },
  );
};
