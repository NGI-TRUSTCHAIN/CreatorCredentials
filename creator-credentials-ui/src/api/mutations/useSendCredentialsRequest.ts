import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import {
  sendCredentialsRequest,
  SendCredentialsRequestPayload,
  SendCredentialsRequestResponse,
} from '../requests/sendCredentialsRequest';

export const useSendCredentialsRequest = (
  options?: Omit<
    UseMutationOptions<
      SendCredentialsRequestResponse,
      AxiosError,
      SendCredentialsRequestPayload
    >,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: (payload: SendCredentialsRequestPayload) =>
      sendCredentialsRequest(payload).then((res) => res.data),
    ...options,
  });
