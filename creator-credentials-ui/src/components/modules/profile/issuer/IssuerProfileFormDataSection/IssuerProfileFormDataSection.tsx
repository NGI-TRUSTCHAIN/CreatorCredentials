import { UserProfile } from '@clerk/nextjs';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormTextField } from '@/components/formFields/FormTextField';
import { IssuerProfileFormContextType } from '../IssuerProfileForm/IssuerProfileFormContextType';

type IssuerProfileFormDataSectionProps = {
  isLoading?: boolean;
  disabled?: boolean;
};

export const IssuerProfileFormDataSection = ({
  isLoading,
  disabled,
}: IssuerProfileFormDataSectionProps) => {
  const { t } = useTranslation('issuer-profile');

  const { control } = useFormContext<IssuerProfileFormContextType>();

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-xl">{t('data.title')}</h3>
      <UserProfile />
      <FormTextField
        label={t('data.fields.domain.label')}
        control={control}
        name="domain"
        disabled={disabled || isLoading}
        inputProps={{
          readOnly: true,
        }}
      />
      <FormTextField
        label={t('data.fields.company-name.label')}
        control={control}
        name="companyName"
        disabled={disabled || isLoading}
        inputProps={{
          readOnly: true,
        }}
      />
      {/* <FormTextField
        label={t('data.fields.email.label')}
        control={control}
        name="email"
        disabled={disabled || isLoading}
        inputProps={{
          readOnly: true,
        }}
      /> */}
    </section>
  );
};
