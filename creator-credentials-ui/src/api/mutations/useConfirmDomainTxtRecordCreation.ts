import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import {
  confirmDomainTxtRecordCreation,
  ConfirmDomainTxtRecordCreationResponse,
} from '../requests/confirmDomainTxtRecordCreation';

export const useConfirmDomainTxtRecordCreation = (
  options?: Omit<
    UseMutationOptions<
      ConfirmDomainTxtRecordCreationResponse,
      AxiosError,
      void
    >,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: () => confirmDomainTxtRecordCreation().then((res) => res.data),
    ...options,
  });
