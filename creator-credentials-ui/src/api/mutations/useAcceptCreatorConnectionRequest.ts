import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
) =>
  useMutation({
    mutationFn: ({ creatorId }: AcceptCreatorConnectionRequestPayload) =>
      acceptCreatorConnectionRequest({ creatorId }).then((res) => res.data),
    ...options,
  });
