import { Button } from 'flowbite-react';
import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormCheckbox } from '@/components/formFields/FormCheckbox';
import { FormTextField } from '@/components/formFields/FormTextField';
import { Icon } from '@/components/shared/Icon';
import { TermsAndConditionsTrans } from '@/components/shared/TermsAndConditionsTrans';
import { CreatorSignupFormContextType } from './CreatorSignupFormContextType';

export type CreatorSignupFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
};

export const CreatorSignupForm = ({
  handleSubmit,
  isLoading,
}: CreatorSignupFormProps) => {
  const { t } = useTranslation('creator-signup');
  const {
    control,
    watch,
    formState: { isValid },
  } = useFormContext<CreatorSignupFormContextType>();

  const termsAndConditionsValue = watch('termsAndConditions');

  return (
    <form
      className="flex flex-1 flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <FormTextField
        label={t('email', { ns: 'common' })}
        control={control}
        name="email"
        disabled={isLoading}
      />
      <FormCheckbox
        label={<TermsAndConditionsTrans />}
        name="termsAndConditions"
        control={control}
        disabled={isLoading}
        labelProps={{
          className: 'font-medium',
        }}
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isValid || !termsAndConditionsValue || isLoading}
          isProcessing={isLoading}
          color="primary"
        >
          <p>{t('send', { ns: 'common' })}</p>
          <Icon
            icon="ArrowRight"
            className="ms-2"
          />
        </Button>
      </div>
    </form>
  );
};
