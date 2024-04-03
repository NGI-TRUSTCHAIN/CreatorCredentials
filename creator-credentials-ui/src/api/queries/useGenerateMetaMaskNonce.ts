import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

import {
  generateMetaMaskNonce,
  GenerateMetaMaskNonceResponse,
} from '../requests/generateMetaMaskNonce';

export const useGenerateMetaMaskNonce = (
  options?: Omit<
    UseQueryOptions<GenerateMetaMaskNonceResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GenerateMetaMaskNonceResponse>(
    [],
    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useGenerateMetaMaskNonce call');
      }
      return generateMetaMaskNonce(token).then((res) => res.data);
    },
    {
      ...options,
    },
  );
};
