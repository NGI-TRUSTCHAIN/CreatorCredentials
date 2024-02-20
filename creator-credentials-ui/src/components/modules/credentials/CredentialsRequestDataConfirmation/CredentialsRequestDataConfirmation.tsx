import { Card } from 'flowbite-react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useSendCredentialsRequest } from '@/api/mutations/useSendCredentialsRequest';
import { CredentialDetailsCard } from '@/components/shared/CredentialDetailsCard';
import { FormFooter } from '@/components/shared/FormFooter';
import { Icon } from '@/components/shared/Icon';
import { IssuerDetailsCard } from '@/components/shared/IssuerDetailsCard';
import { SuccessfullCredentialRequestConfirmationCard } from '@/components/shared/SuccessfullCredentialRequestConfirmationCard';
import { PageHeader } from '@/components/shared/PageHeader';
import axiosNest from '@/api/axiosNest';
import { useCredentialsRequestContext } from '../CredentialsRequestContext';
import { CredentialsRequestStepper } from '../CredentialsRequestStepper';

export const CredentialsRequestDataConfirmation = () => {
  const { t } = useTranslation('creator-credentials-request');
  const auth = useAuth();
  const user = useUser();
  const {
    mutateAsync: sendCredentialsRequest,
    isSuccess: successfullyRequestedCredentials,
    isLoading: isRequestingCredentials,
  } = useSendCredentialsRequest();

  const { stepper, credentials, selectedIssuer } =
    useCredentialsRequestContext();

  const confirmButtonHandler = async () => {
    try {
      if (!selectedIssuer) return;

      const token = await auth.getToken();
      try {
        await axiosNest.post(
          `v1/credentials/create/email`,
          {
            email: user.user?.emailAddresses[0].emailAddress,
            did: user.user?.emailAddresses[0].emailAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } finally {
        await sendCredentialsRequest({
          credentials: credentials.selectedItems.map(
            (credential) => credential.type,
          ),
          issuerId: selectedIssuer.id,
        });
      }
    } catch (err) {}
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
          {credentials.selectedItems.map((credential) => (
            <CredentialDetailsCard
              dropdownItems={[]}
              key={credential.type}
              credential={credential}
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
