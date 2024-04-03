import { useTranslation } from '@/shared/utils/useTranslation';
import { useIssuerCreators } from '@/api/queries/useIssuerCreators';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { CreatorDetailsCard } from '@/components/shared/CreatorDetailsCard';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { CreatorCardAcceptRejectFooter } from '../CreatorCardAcceptRejectFooter';
import { CreatorsFilters } from '../CreatorsFilters';

export const IssuerRequestedCreators = () => {
  const { t } = useTranslation('issuer-creators');

  const { data, status, isFetching, isLoading } = useIssuerCreators({
    params: {
      status: CreatorVerificationStatus.Pending,
    },
  });

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
            backRoute="/issuer/creators/requested"
            subtitle={'Connection request'}
            creator={creator}
            renderFooter={() =>
              creator.status === CreatorVerificationStatus.Pending ? (
                <CreatorCardAcceptRejectFooter creator={creator} />
              ) : (
                <ColoredBadge
                  badgeType="accepted"
                  className="self-center"
                />
              )
            }
          />
        ))}
      </div>
    </>
  );
};
