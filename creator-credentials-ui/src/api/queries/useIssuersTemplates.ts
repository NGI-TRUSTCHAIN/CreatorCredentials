import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getIssuersTemplates,
  GetIssuersTemplatesResponse,
} from '../requests/getIssuersTemplates';

export const useIssuersTemplates = (
  options?: Omit<
    UseQueryOptions<GetIssuersTemplatesResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetIssuersTemplatesResponse>(
    [QueryKeys.creatorsRequestableTemplates],

    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useIssuersTemplates call');
      }

      return getIssuersTemplates(token).then((res) => res.data);
    },
    {
      ...options,
    },
  );
};
