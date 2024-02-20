import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormTextField } from '@/components/formFields/FormTextField';
import { DidWebVerificationEnterDomainFormContextType } from './DidWebVerificationEnterDomainFormContextType';

type DidWebVerificationEnterDomainFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
  disabled?: boolean;
};

export const DidWebVerificationEnterDomainForm = ({
  handleSubmit,
  isLoading,
  disabled,
}: DidWebVerificationEnterDomainFormProps) => {
  const { t } = useTranslation('didweb-verification');

  const {
    control,
    formState: { isValid },
  } = useFormContext<DidWebVerificationEnterDomainFormContextType>();

  return (
    <form
      className="flex flex-1 flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <FormTextField
        label={t('cards.domain.fields.domain.label')}
        control={control}
        name="domain"
        disabled={disabled || isLoading}
        inputProps={{
          placeholder: t('cards.domain.fields.domain.placeholder'),
        }}
      />
      <div className="flex">
        <Button
          type="submit"
          disabled={!isValid || isLoading || disabled}
          isProcessing={isLoading}
          color="primary"
        >
          <p>{t('cards.domain.button')}</p>
        </Button>
      </div>
    </form>
  );
};
