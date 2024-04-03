import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

import { getUser, GetUserResponse } from '../requests/getUser';
import { QueryKeys } from '../queryKeys';

export const useGetUser = (
  options?: Omit<UseQueryOptions<GetUserResponse>, 'queryFn' | 'queryKey'>,
) => {
  const auth = useAuth();

  return useQuery<GetUserResponse>(
    [QueryKeys.getUser],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useGetUser call');
      }
      return getUser(token).then((res) => res.data);
    },
    {
      ...options,
    },
  );
};
