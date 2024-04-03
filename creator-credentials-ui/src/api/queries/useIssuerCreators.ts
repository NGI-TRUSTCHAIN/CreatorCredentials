import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerCreators,
  GetIssuerCreatorsResponse,
  GetIssuerCreatorsSearchParams,
} from '../requests/getIssuerCreators';

export const useIssuerCreators = (
  {
    params,
  }: {
    params: GetIssuerCreatorsSearchParams;
  },
  options?: Omit<
    UseQueryOptions<GetIssuerCreatorsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetIssuerCreatorsResponse>(
    [QueryKeys.issuerCreators, params],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useIssuerCreators call');
      }
      return getIssuerCreators(params, token).then((res) => res.data);
    },
    {
      ...options,
      refetchInterval: 60000,
      refetchOnMount: true,
    },
  );
};
