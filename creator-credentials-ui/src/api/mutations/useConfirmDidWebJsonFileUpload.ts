import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  confirmDidWebJsonFileUpload,
  ConfirmDidWebJsonFileUploadResponse,
} from '../requests/confirmDidWebJsonFileUpload';

export const useConfirmDidWebJsonFileUpload = (
  options?: Omit<
    UseMutationOptions<ConfirmDidWebJsonFileUploadResponse, AxiosError, void>,
    'mutationFn'
  >,
) => {
  const auth = useAuth();
  return useMutation({
    mutationFn: async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useConfirmDidWebJsonFileUpload call');
      }

      return confirmDidWebJsonFileUpload(token).then((res) => res.data);
    },
    ...options,
  });
};
