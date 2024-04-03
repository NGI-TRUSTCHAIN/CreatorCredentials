import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import { AxiosError } from '@/api/axiosNest';
import {
  getCreatorCredentials,
  GetCreatorCredentialsResponse,
} from '../requests/getCreatorCredentials';

export const useCreatorCredentials = (
  options?: Omit<
    UseQueryOptions<GetCreatorCredentialsResponse, AxiosError>,
    'queryFn'
  >,
) => {
  const auth = useAuth();

  return useQuery({
    queryKey: [QueryKeys.creatorVerifiedCredentials],
    queryFn: async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCreatorCredentials call');
      }
      return getCreatorCredentials(token);
    },
    refetchInterval: 60000,
    ...options,
  });
};
