import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  connectMetaMaskWallet,
  ConnectMetaMaskWalletProps,
  ConnectMetaMaskWalletResponse,
} from '../requests/connectMetaMaskWallet';

export const useConnectMetaMaskWallet = (
  options?: Omit<
    UseMutationOptions<
      ConnectMetaMaskWalletResponse,
      AxiosError,
      ConnectMetaMaskWalletProps
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async (props: ConnectMetaMaskWalletProps) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useConnectMetaMaskWalletMutation call');
      }

      return connectMetaMaskWallet(token, props).then((res) => res.data);
    },
    ...options,
  });
};
