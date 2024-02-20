import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import {
  createDidWebJsonFile,
  CreateDidWebJsonFilePayload,
  CreateDidWebJsonFileResponse,
} from '../requests/createDidWebJsonFile';

export const useCreateDidWebJsonFile = (
  options?: Omit<
    UseMutationOptions<
      CreateDidWebJsonFileResponse,
      AxiosError,
      CreateDidWebJsonFilePayload
    >,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: (payload: CreateDidWebJsonFilePayload) =>
      createDidWebJsonFile(payload).then((res) => res.data),
    ...options,
  });
