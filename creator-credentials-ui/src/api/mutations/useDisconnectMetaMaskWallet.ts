import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  disconnectMetaMaskWallet,
  DisconnectMetaMaskWalletResponse,
} from '../requests/disconnectMetaMaskWallet';

export const useDisconnectMetaMaskWallet = (
  options?: Omit<
    UseMutationOptions<DisconnectMetaMaskWalletResponse, AxiosError, string>,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useDisconnectMetaMaskWallet call');
      }

      return disconnectMetaMaskWallet(token).then((res) => res.data);
    },
    ...options,
  });
};
