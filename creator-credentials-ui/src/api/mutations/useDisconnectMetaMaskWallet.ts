import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
) =>
  useMutation({
    mutationFn: (walletAddress: string) =>
      disconnectMetaMaskWallet(walletAddress).then((res) => res.data),
    ...options,
  });
