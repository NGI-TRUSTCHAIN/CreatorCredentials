import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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
) =>
  useMutation({
    mutationFn: ({ creatorId }: RejectCreatorConnectionRequestPayload) =>
      rejectCreatorConnectionRequest({ creatorId }).then((res) => res.data),
    ...options,
  });
