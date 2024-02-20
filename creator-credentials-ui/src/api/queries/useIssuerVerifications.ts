import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerCredentials,
  GetIssuerCredentialsResponse,
} from '../requests/getIssuerCredentials';
import {
  getEmailCredential,
  GetEmailCredentialResponse,
} from '../requests/getEmailCredential';

export type GetIssuerVerificationsResponse = GetEmailCredentialResponse &
  GetIssuerCredentialsResponse;

export const useIssuerVerifications = (
  options?: Omit<
    UseQueryOptions<GetIssuerVerificationsResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetIssuerVerificationsResponse>(
    [QueryKeys.issuerCredentials],
    async () => {
      const token = await auth.getToken();

      if (!token) {
        throw new Error('Unauthorised useIssuerVerifications call');
      }

      const responses = await Promise.all([
        getEmailCredential(token),
        getIssuerCredentials(),
      ]);

      return Object.assign({}, ...responses.map((res) => res.data));
    },
    {
      ...options,
    },
  );
};
