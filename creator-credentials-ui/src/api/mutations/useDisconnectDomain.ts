import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  disconnectDomain,
  DisconnectDomainResponse,
} from '../requests/disconnectDomain';
import { QueryKeys } from '../queryKeys';

export const useDisconnectDomain = (
  options?: Omit<
    UseMutationOptions<DisconnectDomainResponse, AxiosError, void>,
    'mutationFn'
  >,
) => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useDisconnectDomain call');
      }

      return disconnectDomain(token).then((res) => res.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.creatorVerifiedCredentials]);
    },
    ...options,
  });
};
