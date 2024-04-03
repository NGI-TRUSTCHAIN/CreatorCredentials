import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import { getIssuers, GetIssuersResponse } from '../requests/getIssuers';

export const useCreatorIssuers = (
  options?: Omit<UseQueryOptions<GetIssuersResponse>, 'queryFn' | 'queryKey'>,
) => {
  const auth = useAuth();

  return useQuery<GetIssuersResponse>(
    [QueryKeys.creatorIssuers],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCreatorIssuers call');
      }
      return getIssuers(token).then((res) => res.data);
    },
    options,
  );
};
