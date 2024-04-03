import { Button } from 'flowbite-react';
import { useCallback } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
// import { useRequestableCredentials } from '@/api/queries/useRequestableCredentials';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { FormFooter } from '@/components/shared/FormFooter';
import { Loader } from '@/components/shared/Loader';
import { PageHeader } from '@/components/shared/PageHeader';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { CredentialTemplateDetailsCard } from '@/components/shared/CredentialTemplateDetailsCard';
import { useCreatorsRequestableTemplates } from '@/api/queries/useCreatorsRequestableTemplates';
import { useCredentialsRequestContext } from '../CredentialsRequestContext';
import { CredentialsRequestStepper } from '../CredentialsRequestStepper';

export const CredentialsRequestSelectCredentials = () => {
  const { t } = useTranslation('creator-credentials-request');

  const { stepper, templates } = useCredentialsRequestContext();

  const { data, isFetching, isLoading, status } =
    useCreatorsRequestableTemplates();

  const renderContent = useCallback(() => {
    if (status === 'error') {
      return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
    }

    if (isLoading || isFetching) {
      return <Loader />;
    }
    const templatesToRender = data.templates;

    return (
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {templatesToRender.map((template) => (
            <CredentialTemplateDetailsCard
              key={template.id}
              dropdownItems={[]}
              template={template}
              renderFooter={() => {
                const selected = templates.isSelected(template);

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
                    onClick={() => templates.toggleSelection(template)}
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
  }, [templates, data, isFetching, isLoading, status, t]);

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
            templates.selectedItems.length === 0 || isLoading || isFetching
          }
        />
      </FormFooter>
    </>
  );
};
