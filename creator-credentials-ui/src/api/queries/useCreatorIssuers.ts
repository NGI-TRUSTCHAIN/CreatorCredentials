import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import { QueryKeys } from '@/api/queryKeys';
import { Issuer } from '@/shared/typings/Issuer';
import { getCreatorIssuers } from '../requests/getCreatorIssuers';

export const useCreatorIssuers = (
  options?: Omit<UseQueryOptions<Issuer[], AxiosError>, 'queryFn'>,
) =>
  useQuery({
    queryKey: [QueryKeys.creatorIssuers],
    queryFn: () => getCreatorIssuers().then((res) => res.data.issuers),
    ...options,
  });
