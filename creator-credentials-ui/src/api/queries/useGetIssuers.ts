import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

import { getIssuers, GetIssuersResponse } from '../requests/getIssuers';
import { QueryKeys } from '../queryKeys';

export const useGetIssuers = (
  options?: Omit<UseQueryOptions<GetIssuersResponse>, 'queryFn' | 'queryKey'>,
) => {
  const auth = useAuth();

  return useQuery<GetIssuersResponse>(
    [QueryKeys.getIssuers],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useGetIssuers call');
      }
      return getIssuers(token).then((res) => res.data);
    },
    {
      ...options,
      refetchInterval: 60000,
    },
  );
};
