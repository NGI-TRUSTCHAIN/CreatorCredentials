import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
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
) => {
  const auth = useAuth();
  return useMutation({
    mutationFn: async (payload: CreateDidWebJsonFilePayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCreateDidWebJsonFile call');
      }

      return createDidWebJsonFile(token, payload).then((res) => res.data);
    },
    ...options,
  });
};
