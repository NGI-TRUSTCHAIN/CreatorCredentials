import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';

import {
  rejectCredentialsIssuanceRequest,
  RejectCredentialsIssuanceRequestPayload,
  RejectCredentialsIssuanceRequestResponse,
} from '../requests/rejectCredentialsIssuanceRequest';

export const useRejectCredentialsIssuanceRequest = (
  options?: Omit<
    UseMutationOptions<
      RejectCredentialsIssuanceRequestResponse,
      AxiosError,
      RejectCredentialsIssuanceRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      credentialId,
    }: RejectCredentialsIssuanceRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error(
          'Unauthorised useRejectCredentialsIssuanceRequest call',
        );
      }
      return rejectCredentialsIssuanceRequest({ credentialId }, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
