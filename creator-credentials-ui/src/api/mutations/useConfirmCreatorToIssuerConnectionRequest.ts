import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
) =>
  useMutation({
    mutationFn: ({
      issuerId,
    }: ConfirmCreatorToIssuerConnectionRequestPayload) =>
      confirmCreatorToIssuerConnectionRequest({ issuerId }).then(
        (res) => res.data,
      ),
    ...options,
  });
