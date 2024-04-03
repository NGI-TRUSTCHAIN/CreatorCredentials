import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  disconnectDidWeb,
  DisconnectDidWebResponse,
} from '../requests/disconnectDidWeb';
import { QueryKeys } from '../queryKeys';

export const useDisconnectDidWeb = (
  options?: Omit<
    UseMutationOptions<DisconnectDidWebResponse, AxiosError, void>,
    'mutationFn'
  >,
) => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useDisconnectDidWeb call');
      }

      return disconnectDidWeb(token).then((res) => res.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.issuerCredentials]);
    },
    ...options,
  });
};
