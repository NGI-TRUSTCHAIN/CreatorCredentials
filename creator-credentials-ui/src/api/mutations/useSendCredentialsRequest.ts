import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
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
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async (payload: SendCredentialsRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useSendCredentialsRequest call');
      }
      return sendCredentialsRequest(payload, token).then((res) => res.data);
    },
    ...options,
  });
};
