import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormSwitch } from '@/components/formFields/FormSwitch';
import { FormCheckbox } from '@/components/formFields/FormCheckbox';
import { CreatorCredentialVisibilityFormContextType } from './CreatorCredentialVisibilityForm.types';

export type CreatorSignupFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
};

export const CreatorCredentialVisibilityForm = ({
  handleSubmit,
  isLoading,
}: CreatorSignupFormProps) => {
  const { t } = useTranslation('creator-profile');
  const { control } =
    useFormContext<CreatorCredentialVisibilityFormContextType>();

  return (
    <form
      className="flex flex-1 flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <FormSwitch
        label={t('privacy.credential-visibility.fields.show-all')}
        name="showAll"
        control={control}
        disabled={isLoading}
      />
      <FormCheckbox
        label={t('privacy.credential-visibility.fields.e-mail')}
        name="email"
        control={control}
        disabled={isLoading}
      />
      <FormCheckbox
        label={t('privacy.credential-visibility.fields.wallet')}
        name="wallet"
        control={control}
        disabled={isLoading}
      />
      <FormCheckbox
        label={t('privacy.credential-visibility.fields.domain')}
        name="domain"
        control={control}
        disabled={isLoading}
      />
    </form>
  );
};
