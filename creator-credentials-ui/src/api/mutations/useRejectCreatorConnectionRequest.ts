import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  rejectCreatorConnectionRequest,
  RejectCreatorConnectionRequestPayload,
  RejectCreatorConnectionRequestResponse,
} from '../requests/rejectCreatorConnectionRequest';

export const useRejectCreatorConnectionRequest = (
  options?: Omit<
    UseMutationOptions<
      RejectCreatorConnectionRequestResponse,
      AxiosError,
      RejectCreatorConnectionRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      creatorId,
    }: RejectCreatorConnectionRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useRejectCreatorConnectionRequest call');
      }
      return rejectCreatorConnectionRequest({ creatorId }, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
