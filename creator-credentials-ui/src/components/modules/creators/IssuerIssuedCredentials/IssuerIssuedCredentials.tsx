import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/shared/utils/useTranslation';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { useIssuersCredentials } from '@/api/queries/useIssuersCredentials';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { useDeleteMemberCredential } from '@/api/mutations/useDeleteMemberCredential';
import { QueryKeys } from '@/api/queryKeys';
import { useIssuerCreators } from '@/api/queries/useIssuerCreators';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { CreatorCredentialDetailsCard } from '@/components/shared/CreatorCredentialDetailsCard';
import { CreatorsFilters } from '../CreatorsFilters';
import { CredentialsCardAcceptRejectFooter } from '../CredentialsCardAcceptRejectFooter';

export const IssuerIssuedCredentials = () => {
  const { t } = useTranslation('issuer-creators');

  const queryClient = useQueryClient();
  const { data, status, isFetching, isLoading } = useIssuersCredentials(
    {
      params: {
        status: CredentialVerificationStatus.Success,
      },
    },
    // TODO: Decide whether we want to keep this functionality after removing MSW
    {
      staleTime: 60,
      refetchOnMount: false,
    },
  );

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

  const { mutateAsync: deleteMemberCredential } = useDeleteMemberCredential({
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.issuersCredentials]);
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
            <CreatorCredentialDetailsCard
              additionalBadgeType={'credential'}
              key={creator.id}
              credential={credential}
              creator={creator}
              subtitle={'Issued credential'}
              backRoute="/issuer/credentials/issued"
              dropdownItems={[
                {
                  onClick: () => {
                    deleteMemberCredential({ credentialId: credential.id });
                  },
                  children: 'Delete credential',
                },
              ]}
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
