import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormTextField } from '@/components/formFields/FormTextField';
import { DomainVerificationEnterDomainFormContextType } from './DomainVerificationEnterDomainFormContextType';

type DomainVerificationEnterDomainFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
  disabled?: boolean;
};

export const DomainVerificationEnterDomainForm = ({
  handleSubmit,
  isLoading,
  disabled,
}: DomainVerificationEnterDomainFormProps) => {
  const { t } = useTranslation('domain-verification');

  const {
    control,
    formState: { isValid },
  } = useFormContext<DomainVerificationEnterDomainFormContextType>();

  return (
    <form
      className="flex flex-1 flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <FormTextField
        label={t('cards.enter-domain.fields.domain.label')}
        control={control}
        name="domain"
        disabled={disabled || isLoading}
        inputProps={{
          placeholder: t('cards.enter-domain.fields.domain.placeholder'),
        }}
      />
      <div className="flex">
        <Button
          type="submit"
          disabled={!isValid || isLoading || disabled}
          isProcessing={isLoading}
          color="primary"
        >
          <p>{t('cards.enter-domain.button')}</p>
        </Button>
      </div>
    </form>
  );
};
