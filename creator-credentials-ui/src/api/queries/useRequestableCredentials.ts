import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import {
  getRequestableCredentials,
  GetRequestableCredentialsResponse,
} from '../requests/getRequestableCredentials';

export const useRequestableCredentials = (
  issuerId?: string,
  options?: Omit<
    UseQueryOptions<GetRequestableCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<GetRequestableCredentialsResponse>(
    [QueryKeys.requestableCredentials, issuerId],
    () => getRequestableCredentials(issuerId).then((res) => res.data),
    {
      ...options,
    },
  );
