import { Button } from 'flowbite-react';
import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Icon } from '@/components/shared/Icon';
import { FormTextField } from '@/components/formFields/FormTextField';
import { LoginFormContextType } from './LoginForm.types';

export type CreatorSignupFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
};

export const LoginForm = ({
  handleSubmit,
  isLoading,
}: CreatorSignupFormProps) => {
  const { t } = useTranslation('signup');
  const {
    control,
    formState: { isValid },
  } = useFormContext<LoginFormContextType>();

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
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isValid || isLoading}
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
