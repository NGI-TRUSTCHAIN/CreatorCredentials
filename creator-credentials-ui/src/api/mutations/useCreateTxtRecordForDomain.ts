import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
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
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async (domain: string) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCreateTxtRecordForDomain call');
      }

      return createTxtRecordForDomain(token, domain).then((res) => res.data);
    },
    ...options,
  });
};
