import { Card } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useSendCredentialsRequest } from '@/api/mutations/useSendCredentialsRequest';
// import { CredentialDetailsCard } from '@/components/shared/CredentialDetailsCard';
import { FormFooter } from '@/components/shared/FormFooter';
import { Icon } from '@/components/shared/Icon';
import { IssuerDetailsCard } from '@/components/shared/IssuerDetailsCard';
import { SuccessfullCredentialRequestConfirmationCard } from '@/components/shared/SuccessfullCredentialRequestConfirmationCard';
import { PageHeader } from '@/components/shared/PageHeader';
import { CredentialTemplateDetailsCard } from '@/components/shared/CredentialTemplateDetailsCard';
import { useCredentialsRequestContext } from '../CredentialsRequestContext';
import { CredentialsRequestStepper } from '../CredentialsRequestStepper';

export const CredentialsRequestDataConfirmation = () => {
  const { t } = useTranslation('creator-credentials-request');
  const {
    mutateAsync: sendCredentialsRequest,
    isSuccess: successfullyRequestedCredentials,
    isLoading: isRequestingCredentials,
  } = useSendCredentialsRequest();

  const { stepper, templates, selectedIssuer } = useCredentialsRequestContext();

  const confirmButtonHandler = () => {
    if (!selectedIssuer) return;

    sendCredentialsRequest({
      templates: templates.selectedItems,
      issuerId: selectedIssuer.id,
    });
  };

  if (successfullyRequestedCredentials) {
    return <SuccessfullCredentialRequestConfirmationCard />;
  }

  return (
    <>
      <PageHeader
        title={t('header.title')}
        subtitle={t('steps.confirm-data.description')}
        closeButtonHref="/creator/credentials"
      />
      <div className="flex justify-center">
        <CredentialsRequestStepper activeStep={stepper.activeStep} />
      </div>
      <Card className="mt-12 w-full">
        <h3 className="mb-4 text-xl">
          {t('steps.confirm-data.card.credential')}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {templates.selectedItems.map((template) => (
            <CredentialTemplateDetailsCard
              dropdownItems={[]}
              key={template.templateType}
              template={template}
            />
          ))}
        </div>
        <h3 className="mb-4 mt-14 text-xl">
          {t('steps.confirm-data.card.issuer')}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <IssuerDetailsCard
            issuer={selectedIssuer!}
            renderFooter={null}
          />
        </div>
        <h4 className="mb-4 mt-14 text-base">
          {t('steps.confirm-data.card.confirm')}
        </h4>
      </Card>
      <FormFooter>
        <FormFooter.BackButton onClick={stepper.prevStep} />
        <FormFooter.ConfirmButton
          onClick={confirmButtonHandler}
          disabled={!selectedIssuer || isRequestingCredentials}
          isProcessing={isRequestingCredentials}
        >
          {t('confirm', { ns: 'common' })}
          <Icon
            icon="ArrowRight"
            className="ms-2"
          />
        </FormFooter.ConfirmButton>
      </FormFooter>
    </>
  );
};
