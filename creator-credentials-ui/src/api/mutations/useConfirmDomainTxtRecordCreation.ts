import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
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
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useConfirmDomainTxtRecordCreation call');
      }

      return confirmDomainTxtRecordCreation(token).then((res) => res.data);
    },
    ...options,
  });
};
