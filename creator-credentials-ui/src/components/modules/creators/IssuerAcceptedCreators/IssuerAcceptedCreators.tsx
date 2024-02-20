import { useTranslation } from '@/shared/utils/useTranslation';
import { useIssuerCreators } from '@/api/queries/useIssuerCreators';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { CreatorDetailsCard } from '@/components/shared/CreatorDetailsCard';
import { CreatorsFilters } from '../CreatorsFilters';

export const IssuerAcceptedCreators = () => {
  const { t } = useTranslation('issuer-creators');

  const { data, status, isFetching, isLoading } = useIssuerCreators(
    {
      params: {
        status: CreatorVerificationStatus.Accepted,
        search: '',
      },
    },
    // TODO: Decide whether we want to keep this functionality after removing MSW
    {
      staleTime: 60,
      refetchOnMount: false,
    },
  );

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-creators')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <CreatorsFilters />
      <div className="grid grid-cols-3 gap-4">
        {data.creators.map((creator) => (
          <CreatorDetailsCard
            key={creator.id}
            creator={creator}
          />
        ))}
      </div>
    </>
  );
};
