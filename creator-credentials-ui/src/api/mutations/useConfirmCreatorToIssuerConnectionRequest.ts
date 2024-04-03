import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  confirmCreatorToIssuerConnectionRequest,
  ConfirmCreatorToIssuerConnectionRequestPayload,
  ConfirmCreatorToIssuerConnectionRequestResponse,
} from '../requests/confirmCreatorToIssuerConnectionRequest';

export const useConfirmCreatorToIssuerConnectionRequest = (
  options?: Omit<
    UseMutationOptions<
      ConfirmCreatorToIssuerConnectionRequestResponse,
      AxiosError,
      ConfirmCreatorToIssuerConnectionRequestPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({
      issuerId,
    }: ConfirmCreatorToIssuerConnectionRequestPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error(
          'Unauthorised useConfirmCreatorToIssuerConnectionRequest call',
        );
      }
      return confirmCreatorToIssuerConnectionRequest({ issuerId }, token).then(
        (res) => res.data,
      );
    },
    ...options,
  });
};
