import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuersCredentials,
  GetIssuersCredentialsSearchParams,
  GetIssuersCredentialsResponse,
} from '../requests/getIssuersCredentials';

export const useIssuersCredentials = (
  {
    params,
  }: {
    params: GetIssuersCredentialsSearchParams;
  },
  options?: Omit<
    UseQueryOptions<GetIssuersCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetIssuersCredentialsResponse>(
    [QueryKeys.issuersCredentials, params],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useIssuerCreators call');
      }
      return getIssuersCredentials(params, token).then((res) => res.data);
    },
    {
      ...options,
      refetchInterval: 60000,
      refetchOnMount: true,
    },
  );
};
