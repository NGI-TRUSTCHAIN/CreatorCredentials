import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getEmailCredential,
  GetEmailCredentialResponse,
} from '../requests/getEmailCredential';

export const useEmailCredential = (
  options?: Omit<
    UseQueryOptions<GetEmailCredentialResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetEmailCredentialResponse>(
    [QueryKeys.creatorEmailCredential],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useEmailCredential call');
      }
      return getEmailCredential(token).then((res) => res.data);
    },
    {
      ...options,
    },
  );
};
