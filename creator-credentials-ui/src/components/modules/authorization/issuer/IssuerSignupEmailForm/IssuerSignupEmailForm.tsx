import { CustomFlowbiteTheme } from 'flowbite-react';
import { FormEventHandler, ReactNode } from 'react';
import { FormState, useFormContext } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { FormCheckbox } from '@/components/formFields/FormCheckbox';
import { FormTextField } from '@/components/formFields/FormTextField';
import { TermsAndConditionsTrans } from '@/components/shared/TermsAndConditionsTrans';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { EmailDomain } from './EmailDomain';
import { IssuerSignupEmailFormContextType } from './IssuerSignupEmailForm.types';

const emailWithDomainInputTheme: CustomFlowbiteTheme['textInput'] = {
  field: {
    base: 'grid grid-cols-[60%,1fr] grid-reverse items-center justify-end',
    rightIcon: {
      base: 'static inset-y-0 left-0 flex items-center text-md overflow-hidden order-2 max-w-[200px]',
      svg: '',
    },
    input: {
      base: 'block border disabled:cursor-not-allowed disabled:opacity-50 order-1',
      withRightIcon: {
        on: '',
      },
    },
  },
};

export type IssuerSignupEmailFormProps = {
  isLoading?: boolean;
  className?: string | ClassValue;
  emailInputDomain: string;
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  renderButtons?: (
    formState: FormState<IssuerSignupEmailFormContextType>,
  ) => ReactNode;
};

export const IssuerSignupEmailForm = ({
  isLoading,
  className,
  emailInputDomain,
  handleSubmit,
  renderButtons,
}: IssuerSignupEmailFormProps) => {
  const { t } = useTranslation('issuer-signup');

  const { control, formState } =
    useFormContext<IssuerSignupEmailFormContextType>();

  return (
    <form
      className={clsxm('flex flex-col items-center gap-14', className)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-7">
        <FormTextField
          label={t('form-fields.address.label')}
          control={control}
          name="address"
          disabled={isLoading}
          inputProps={{
            placeholder: t('form-fields.address.placeholder'),
            theme: emailWithDomainInputTheme,
            rightIcon: () => <EmailDomain domain={emailInputDomain} />,
          }}
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
      </div>
      {renderButtons && renderButtons(formState)}
    </form>
  );
};
