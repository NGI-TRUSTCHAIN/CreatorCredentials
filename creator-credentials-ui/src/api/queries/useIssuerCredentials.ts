import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerCredentials,
  GetIssuerCredentialsResponse,
} from '../requests/getIssuerCredentials';

export const useIssuerCredentials = (
  options?: Omit<
    UseQueryOptions<GetIssuerCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<GetIssuerCredentialsResponse>(
    [QueryKeys.issuerCredentials],
    () => getIssuerCredentials().then((res) => res.data),
    {
      ...options,
    },
  );
