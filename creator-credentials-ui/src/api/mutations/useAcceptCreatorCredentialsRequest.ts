import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  acceptCreatorCredentialsRequest,
  AcceptCreatorCredentialsRequestPayload,
  AcceptCreatorCredentialsRequestResponse,
} from '../requests/acceptCreatorCredentialsRequest';

export const useAcceptCreatorCredentialsRequest = (
  options?: Omit<
    UseMutationOptions<
      AcceptCreatorCredentialsRequestResponse,
      AxiosError,
      AcceptCreatorCredentialsRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      creatorId,
    }: AcceptCreatorCredentialsRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useAcceptCreatorCredentialsRequest call');
      }
      return acceptCreatorCredentialsRequest({ creatorId }, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
