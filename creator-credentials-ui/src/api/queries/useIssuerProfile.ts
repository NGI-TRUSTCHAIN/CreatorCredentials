import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from '@/api/axiosNest';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuerProfile,
  GetIssuerProfileResponse,
} from '../requests/getIssuerProfile';

export const useIssuerProfile = (
  options?: Omit<
    UseQueryOptions<GetIssuerProfileResponse, AxiosError>,
    'queryFn'
  >,
) =>
  useQuery({
    queryKey: [QueryKeys.issuerProfile],
    queryFn: () => getIssuerProfile().then((res) => res.data),
    ...options,
  });
