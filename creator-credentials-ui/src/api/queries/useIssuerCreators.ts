import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerCreators,
  GetIssuerCreatorsResponse,
  GetIssuerCreatorsSearchParams,
} from '../requests/getIssuerCreators';

export const useIssuerCreators = (
  {
    params,
  }: {
    params: GetIssuerCreatorsSearchParams;
  },
  options?: Omit<
    UseQueryOptions<GetIssuerCreatorsResponse>,
    'queryFn' | 'queryKey'
  >,
) =>
  useQuery<GetIssuerCreatorsResponse>(
    [QueryKeys.issuerCreators, params],
    () => getIssuerCreators(params).then((res) => res.data),
    {
      ...options,
    },
  );
