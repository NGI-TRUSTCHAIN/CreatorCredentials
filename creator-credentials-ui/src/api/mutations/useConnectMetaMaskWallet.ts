import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
) =>
  useMutation({
    mutationFn: (props: ConnectMetaMaskWalletProps) =>
      connectMetaMaskWallet(props).then((res) => res.data),
    ...options,
  });
