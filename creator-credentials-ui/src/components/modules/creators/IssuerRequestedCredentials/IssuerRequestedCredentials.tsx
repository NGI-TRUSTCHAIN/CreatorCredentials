import { useTranslation } from '@/shared/utils/useTranslation';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { useIssuersCredentials } from '@/api/queries/useIssuersCredentials';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { useIssuerCreators } from '@/api/queries/useIssuerCreators';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { CreatorDetailsCard } from '@/components/shared/CreatorDetailsCard';
import { CredentialsCardAcceptRejectFooter } from '../CredentialsCardAcceptRejectFooter';
import { CreatorsFilters } from '../CreatorsFilters';

export const IssuerRequestedCredentials = () => {
  const { t } = useTranslation('issuer-creators');

  const { data, status, isFetching, isLoading } = useIssuersCredentials({
    params: {
      status: CredentialVerificationStatus.Pending,
    },
  });
  const {
    data: creatorsData,
    status: cStatus,
    isFetching: cIsFetching,
    isLoading: cIsLoading,
  } = useIssuerCreators({
    params: {
      status: CreatorVerificationStatus.Accepted,
    },
  });

  if (status === 'error' || cStatus === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-creators')} />;
  }

  if (isLoading || isFetching || cIsFetching || cIsLoading) {
    return <Loader />;
  }

  return (
    <>
      <CreatorsFilters />
      <div className="grid grid-cols-3 gap-4">
        {data.credentials.map((credential) => {
          const creator = creatorsData?.creators.find(
            (c) => parseInt(c.id) === credential.data.credentialObject.userId,
          );

          return creator ? (
            <CreatorDetailsCard
              key={creator.id}
              creator={creator}
              subtitle={'Credentials request'}
              backRoute="/issuer/credentials/requested"
              renderFooter={() =>
                credential.status === CredentialVerificationStatus.Pending ? (
                  <CredentialsCardAcceptRejectFooter credential={credential} />
                ) : (
                  <ColoredBadge
                    badgeType="accepted"
                    className="self-center"
                  />
                )
              }
            />
          ) : null;
        })}
      </div>
    </>
  );
};
