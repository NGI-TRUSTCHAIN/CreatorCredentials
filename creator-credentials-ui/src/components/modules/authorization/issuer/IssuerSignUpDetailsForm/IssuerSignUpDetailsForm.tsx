import { Button } from 'flowbite-react';
import { FormEventHandler } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Icon } from '@/components/shared/Icon';
import { FormTextField } from '@/components/formFields/FormTextField';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { IssuerSignupDetailsFormContextType } from './IssuerSignupDetailsForm.types';

export type IssuerSignupDetailsFormProps = {
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
  className?: string | ClassValue;
};

export const IssuerSignupDetailsForm = ({
  handleSubmit,
  isLoading,
  className,
}: IssuerSignupDetailsFormProps) => {
  const { t } = useTranslation('issuer-signup');
  const {
    control,
    formState: { isValid },
  } = useFormContext<IssuerSignupDetailsFormContextType>();

  return (
    <form
      className={clsxm('flex flex-1 flex-col gap-16', className)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8">
        <FormTextField
          label={t('form-fields.web-domain.label')}
          control={control}
          name="domain"
          disabled={isLoading}
          inputProps={{
            placeholder: t('form-fields.web-domain.placeholder'),
          }}
        />
        <FormTextField
          label={t('form-fields.company-name.label')}
          control={control}
          name="companyName"
          disabled={isLoading}
          inputProps={{
            placeholder: t('form-fields.company-name.placeholder'),
          }}
        />
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          isProcessing={isLoading}
          color="primary"
        >
          <p>{t('next', { ns: 'common' })}</p>
          <Icon
            icon="ArrowRight"
            className="ms-2"
          />
        </Button>
      </div>
    </form>
  );
};
