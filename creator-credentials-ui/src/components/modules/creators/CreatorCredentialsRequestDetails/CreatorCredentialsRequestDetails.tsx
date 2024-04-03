import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useCredentialsRequestDetails } from '@/api/queries/useCredentialsRequestDetails';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { CreatorDetailsCard } from '@/components/shared/CreatorDetailsCard';
import { CredentialDetailsCard } from '@/components/shared/CredentialDetailsCard';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { QueryKeys } from '@/api/queryKeys';
import { GetCredentialsRequestDetailsResponse } from '@/api/requests/getCredentialsRequestDetails';
import { downloadJson } from '@/shared/utils/downloadJson';
import { CredentialType } from '@/shared/typings/CredentialType';
import { CreatorCardAcceptRejectFooter } from '../CreatorCardAcceptRejectFooter';

type CreatorCredentialsRequestDetailsProps = {
  creatorId: string;
};

export const CreatorCredentialsRequestDetails = ({
  creatorId,
}: CreatorCredentialsRequestDetailsProps) => {
  const { t } = useTranslation('issuer-creator-request-details');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, status, isLoading, isFetching } =
    useCredentialsRequestDetails(creatorId);

  const filteredCredentials = useMemo(() => {
    return data
      ? data.credentials.filter(
          (credential) =>
            credential.type !== CredentialType.Member &&
            credential.type !== CredentialType.DidWeb,
        )
      : [];
  }, [data]);

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-details')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const successfulRejectionHandler = () => {
    router.push('/issuer/creators/requested');
  };

  const successfulAcceptanceHandler = () => {
    queryClient.setQueryData<GetCredentialsRequestDetailsResponse>(
      [QueryKeys.credentialsRequestDetails, creatorId],
      (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          creator: {
            ...oldData.creator,
            status: CreatorVerificationStatus.Accepted,
          },
        };
      },
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-4">
        <CreatorDetailsCard
          creator={data.creator}
          renderFooter={
            data.creator.status === CreatorVerificationStatus.Pending
              ? () => (
                  <CreatorCardAcceptRejectFooter
                    creator={data.creator}
                    onSuccessfulRejection={successfulRejectionHandler}
                    onSuccessfullAcceptation={successfulAcceptanceHandler}
                  />
                )
              : null
          }
        />
      </div>
      <h3 className="text-xl">{t('credentials.title')}</h3>
      <div className="grid grid-cols-3 gap-4">
        {filteredCredentials.map((credential) => {
          let value = ''; //credentials.email.data.address;
          const credentialObject = credential.data.credentialObject; //credentials.email.data.credentialObject;

          switch (credential.type) {
            case CredentialType.Email:
              value = credential.data.address;
              break;
            case CredentialType.Wallet:
              value = credential.data.address;
              break;
            case CredentialType.Domain:
              value = credential.data.domain;
              break;
          }

          return (
            <CredentialDetailsCard
              dropdownItems={[
                {
                  onClick: () =>
                    downloadJson(
                      `${value} ${credentialObject.validFrom}`,
                      credentialObject,
                    ),
                  children: t('download', { ns: 'common' }),
                },
              ]}
              key={credential.id}
              credential={credential}
            />
          );
        })}
      </div>
    </div>
  );
};
