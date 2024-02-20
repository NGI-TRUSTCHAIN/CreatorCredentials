import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuersBySelectedCredentials,
  GetIssuersBySelectedCredentialsPayload,
  GetIssuersBySelectedCredentialsResponse,
} from '../requests/getIssuersBySelectedCredentials';

export const useIssuersByCredentials = (
  { credentials }: GetIssuersBySelectedCredentialsPayload,
  options?: Omit<
    UseQueryOptions<GetIssuersBySelectedCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<GetIssuersBySelectedCredentialsResponse>(
    [QueryKeys.issuersByCredentials, credentials],
    () =>
      getIssuersBySelectedCredentials({ credentials }).then((res) => res.data),
    {
      ...options,
    },
  );
