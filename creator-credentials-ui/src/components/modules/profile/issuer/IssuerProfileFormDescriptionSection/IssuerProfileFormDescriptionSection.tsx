import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormTextarea } from '@/components/formFields/FormTextarea';
import { IssuerProfileFormContextType } from '../IssuerProfileForm/IssuerProfileFormContextType';

type IssuerProfileFormDescriptionSectionProps = {
  isLoading?: boolean;
  disabled?: boolean;
};

export const IssuerProfileFormDescriptionSection = ({
  isLoading,
  disabled,
}: IssuerProfileFormDescriptionSectionProps) => {
  const { t } = useTranslation('issuer-profile');

  const { control } = useFormContext<IssuerProfileFormContextType>();

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-xl">{t('description.title')}</h3>
      <FormTextarea
        label={t('description.fields.description.label')}
        control={control}
        name="description"
        disabled={disabled || isLoading}
        inputProps={{
          readOnly: true,
          className: 'resize-none text-base',
          rows: 3,
        }}
      />
    </section>
  );
};
