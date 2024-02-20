import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerDetailsWithCredentials,
  GetIssuerDetailsWithCredentialsPayload,
  GetIssuerDetailsWithCredentialsResponse,
} from '../requests/getIssuerDetailsWithCredentials';

export const useIssuerDetailsWithCredentials = (
  { issuerId }: GetIssuerDetailsWithCredentialsPayload,
  options?: Omit<
    UseQueryOptions<GetIssuerDetailsWithCredentialsResponse>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<GetIssuerDetailsWithCredentialsResponse>(
    [QueryKeys.creatorIssuerDetails, issuerId],
    () => getIssuerDetailsWithCredentials({ issuerId }).then((res) => res.data),
    {
      ...options,
    },
  );
