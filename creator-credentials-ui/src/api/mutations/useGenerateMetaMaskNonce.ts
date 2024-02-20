import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import {
  generateMetaMaskNonce,
  GenerateMetaMaskNoncePayload,
  GenerateMetaMaskNonceResponse,
} from '../requests/generateMetaMaskNonce';

export const useGenerateMetaMaskNonce = (
  options?: Omit<
    UseMutationOptions<
      GenerateMetaMaskNonceResponse,
      AxiosError,
      GenerateMetaMaskNoncePayload
    >,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: (payload: GenerateMetaMaskNoncePayload) =>
      generateMetaMaskNonce(payload).then((res) => res.data),
    ...options,
  });
