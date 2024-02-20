import { Button } from 'flowbite-react';
import { useCallback } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useRequestableCredentials } from '@/api/queries/useRequestableCredentials';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { CredentialDetailsCard } from '@/components/shared/CredentialDetailsCard';
import { FormFooter } from '@/components/shared/FormFooter';
import { Loader } from '@/components/shared/Loader';
import { PageHeader } from '@/components/shared/PageHeader';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { useCredentialsRequestContext } from '../CredentialsRequestContext';
import { CredentialsRequestStepper } from '../CredentialsRequestStepper';

export const CredentialsRequestSelectCredentials = () => {
  const { t } = useTranslation('creator-credentials-request');

  const { preSelectedIssuerId, stepper, credentials } =
    useCredentialsRequestContext();

  const { data, isFetching, isLoading, status } = useRequestableCredentials(
    preSelectedIssuerId ? preSelectedIssuerId : undefined,
  );

  const renderContent = useCallback(() => {
    if (status === 'error') {
      return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
    }

    if (isLoading || isFetching) {
      return <Loader />;
    }
    const credentialsToRender = data.credentials.filter((c) => c.id === '3');

    return (
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {credentialsToRender.map((credential) => (
            <CredentialDetailsCard
              key={credential.id}
              dropdownItems={[]}
              credential={credential}
              renderFooter={(credential) => {
                const selected = credentials.isSelected(credential);

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
                    color="outline"
                    className="self-stretch"
                    onClick={() => credentials.toggleSelection(credential)}
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
  }, [credentials, data, isFetching, isLoading, status, t]);

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('steps.select-credential.description')}
        closeButtonHref="/creator/credentials"
      />
      <div className="flex justify-center">
        <CredentialsRequestStepper activeStep={stepper.activeStep} />
      </div>
      {renderContent()}
      <FormFooter className="justify-end">
        <FormFooter.NextButton
          onClick={stepper.nextStep}
          disabled={
            credentials.selectedItems.length === 0 || isLoading || isFetching
          }
        />
      </FormFooter>
    </>
  );
};
