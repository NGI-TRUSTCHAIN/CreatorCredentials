import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  revokeCreatorConnectionRequest,
  RevokeCreatorConnectionRequestPayload,
  RevokeCreatorConnectionRequestResponse,
} from '../requests/revokeCreatorConnectionRequest';

export const useRevokeCreatorConnectionRequest = (
  options?: Omit<
    UseMutationOptions<
      RevokeCreatorConnectionRequestResponse,
      AxiosError,
      RevokeCreatorConnectionRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      creatorId,
    }: RevokeCreatorConnectionRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useRevokeCreatorConnectionRequest call');
      }
      return revokeCreatorConnectionRequest({ creatorId }, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
