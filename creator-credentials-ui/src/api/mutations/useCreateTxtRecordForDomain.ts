import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import {
  createTxtRecordForDomain,
  CreateTxtRecordForDomainResponse,
} from '../requests/createTxtRecordForDomain';

export const useCreateTxtRecordForDomain = (
  options?: Omit<
    UseMutationOptions<CreateTxtRecordForDomainResponse, AxiosError, string>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: (domain: string) =>
      createTxtRecordForDomain(domain).then((res) => res.data),
    ...options,
  });
