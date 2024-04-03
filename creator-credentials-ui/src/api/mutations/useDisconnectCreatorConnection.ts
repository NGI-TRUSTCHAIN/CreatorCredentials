import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  acceptCreatorConnectionRequest,
  AcceptCreatorConnectionRequestPayload,
  AcceptCreatorConnectionRequestResponse,
} from '../requests/acceptCreatorConnectionRequest';

export const useAcceptCreatorConnectionRequest = (
  options?: Omit<
    UseMutationOptions<
      AcceptCreatorConnectionRequestResponse,
      AxiosError,
      AcceptCreatorConnectionRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      creatorId,
    }: AcceptCreatorConnectionRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useAcceptCreatorConnectionRequest call');
      }
      return acceptCreatorConnectionRequest({ creatorId }, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
