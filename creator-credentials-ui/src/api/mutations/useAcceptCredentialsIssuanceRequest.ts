import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  acceptCredentialsIssuanceRequest,
  AcceptCredentialsIssuanceRequestPayload,
  AcceptCredentialsIssuanceRequestResponse,
} from '../requests/acceptCredentialsIssuanceRequest';

export const useAcceptCredentialsIssuanceRequest = (
  options?: Omit<
    UseMutationOptions<
      AcceptCredentialsIssuanceRequestResponse,
      AxiosError,
      AcceptCredentialsIssuanceRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      credentialId,
    }: AcceptCredentialsIssuanceRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error(
          'Unauthorised useAcceptCredentialsIssuanceRequest call',
        );
      }
      return acceptCredentialsIssuanceRequest({ credentialId }, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
