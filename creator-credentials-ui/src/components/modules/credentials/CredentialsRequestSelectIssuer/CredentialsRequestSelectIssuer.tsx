import { Button } from 'flowbite-react';
import { useCallback } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useIssuersByCredentials } from '@/api/queries/useIssuersByCredentials';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { FormFooter } from '@/components/shared/FormFooter';
import { IssuerDetailsCard } from '@/components/shared/IssuerDetailsCard';
import { Loader } from '@/components/shared/Loader';
import { PageHeader } from '@/components/shared/PageHeader';
import { CredentialType } from '@/shared/typings/CredentialType';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { useCredentialsRequestContext } from '../CredentialsRequestContext';
import { CredentialsRequestStepper } from '../CredentialsRequestStepper';
import { CredentialsRequestNoIssuersCard } from '../CredentialsRequestNoIssuersCard';

export const CredentialsRequestSelectIssuer = () => {
  const { t } = useTranslation('creator-credentials-request');

  const {
    selectedIssuer,
    credentials,
    toggleIssuerSelection,
    preSelectedIssuerId,
    stepper,
  } = useCredentialsRequestContext();

  const { data, isFetching, isLoading, status } = useIssuersByCredentials({
    credentials: credentials.selectedItems.map(
      (credential) => credential.type,
    ) as CredentialType[],
  });

  const renderContent = useCallback(() => {
    if (status === 'error') {
      return <ApiErrorMessage message={t('errors.fetching-issuers')} />;
    }

    if (isLoading || isFetching) {
      return <Loader />;
    }

    const issuersToRender = (
      preSelectedIssuerId
        ? data.issuers.filter((issuer) => issuer.id === preSelectedIssuerId)
        : data.issuers
    ).filter((issuer) => issuer.id === '1');

    if (issuersToRender.length === 0) {
      return <CredentialsRequestNoIssuersCard />;
    }

    return (
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {issuersToRender.map((issuer) => (
            <IssuerDetailsCard
              key={issuer.id}
              issuer={issuer}
              renderFooter={() => {
                const selected = selectedIssuer?.id === issuer.id;

                if (selected) {
                  return (
                    <ColoredBadge
                      badgeType="selected"
                      className="self-center"
                    />
                  );
                }

                return (
                  <Button
                    color="primary"
                    className="self-stretch"
                    onClick={() => toggleIssuerSelection(issuer)}
                  >
                    {t(selected ? 'deselect' : 'select', { ns: 'common' })}
                  </Button>
                );
              }}
            />
          ))}
        </div>
      </div>
    );
  }, [
    data,
    isFetching,
    isLoading,
    preSelectedIssuerId,
    selectedIssuer,
    status,
    t,
    toggleIssuerSelection,
  ]);

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('steps.select-issuer.description')}
        closeButtonHref="/creator/credentials"
      />
      <div className="flex justify-center">
        <CredentialsRequestStepper activeStep={stepper.activeStep} />
      </div>
      {renderContent()}
      <FormFooter>
        <FormFooter.BackButton
          onClick={stepper.prevStep}
          disabled={isLoading || isFetching}
        />
        <FormFooter.NextButton
          onClick={stepper.nextStep}
          disabled={
            (!selectedIssuer && !preSelectedIssuerId) || isLoading || isFetching
          }
        />
      </FormFooter>
    </>
  );
};
