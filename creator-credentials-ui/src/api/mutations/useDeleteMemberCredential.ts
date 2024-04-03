import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { AxiosError } from '@/api/axiosNest';
import {
  deleteMemberCredential,
  deleteMemberCredentialResponse,
  DeleteMemberCredentialPayload,
} from '../requests/deleteMemberCredential';

export const useDeleteMemberCredential = (
  options?: Omit<
    UseMutationOptions<
      deleteMemberCredentialResponse,
      AxiosError,
      DeleteMemberCredentialPayload
    >,
    'mutationFn'
  >,
) => {
  const auth = useAuth();

  return useMutation({
    mutationFn: async ({ credentialId }: DeleteMemberCredentialPayload) => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useDeleteMemberCredential call');
      }
      return deleteMemberCredential(credentialId, token).then(
        (res) => res.data,
      );
    },

    ...options,
  });
};
