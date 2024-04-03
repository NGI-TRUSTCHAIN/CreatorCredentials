import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { QueryKeys } from '@/api/queryKeys';
import {
  getCreatorsRequestableTemplates,
  GetCreatorsRequestableTemplatesResponse,
} from '../requests/getCreatorsRequestableTemplates';

export const useCreatorsRequestableTemplates = (
  options?: Omit<
    UseQueryOptions<GetCreatorsRequestableTemplatesResponse>,
    'queryFn' | 'queryKey'
  >,
) => {
  const auth = useAuth();

  return useQuery<GetCreatorsRequestableTemplatesResponse>(
    [QueryKeys.creatorsRequestableTemplates],

    async () => {
      const token = await auth.getToken();
      if (!token) {
        throw new Error('Unauthorised useCredentialsRequestDetails call');
      }

      return getCreatorsRequestableTemplates(token).then((res) => res.data);
    },
    {
      ...options,
    },
  );
};
