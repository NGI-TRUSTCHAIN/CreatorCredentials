import { joiResolver } from '@hookform/resolvers/joi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useCreateDidWebJsonFile } from '@/api/mutations/useCreateDidWebJsonFile';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { useToast } from '@/shared/hooks/useToast';
import { DomainVerificationEnterDomainFormSchema } from '../../domain/DomainVerificationEnterDomainForm/DomainVerificationEnterDomainFormSchema';
import { useDidWebVerificationContext } from '../DidWebVerificationContext';
import { DidWebVerificationEnterDomainForm } from '../DidWebVerificationEnterDomainForm/DidWebVerificationEnterDomainForm';
import { DidWebVerificationEnterDomainFormContextType } from '../DidWebVerificationEnterDomainForm/DidWebVerificationEnterDomainFormContextType';
import { didWebVerificationEnterDomainDefaultValues } from '../DidWebVerificationEnterDomainForm/DidWebVerificationEnterDomainFormDefaultValues';

export const DidWebVerificationEnterDomainCard = () => {
  const { t } = useTranslation('didweb-verification');
  const { currentStep, setJsonFileContent, setCurrentStep, setDomainAddress } =
    useDidWebVerificationContext();
  const toast = useToast();

  const form = useForm<DidWebVerificationEnterDomainFormContextType>({
    resolver: joiResolver(DomainVerificationEnterDomainFormSchema),
    defaultValues: didWebVerificationEnterDomainDefaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit } = form;

  const { mutateAsync, isLoading } = useCreateDidWebJsonFile();

  const webDomainSubmitHandler: SubmitHandler<
    DidWebVerificationEnterDomainFormContextType
  > = async ({ domain }) => {
    try {
      setCurrentStep('domain');
      const { jsonFileContent } = await mutateAsync({ domain });
      setDomainAddress(domain);
      setJsonFileContent(jsonFileContent);
    } catch (error) {
      toast.error(t('errors.json-file-creation'));
    }
  };

  return (
    <CardWithTitle title={t('cards.domain.title')}>
      <FormProvider {...form}>
        <div className="w-[50%]">
          <DidWebVerificationEnterDomainForm
            disabled={currentStep === 'verification'}
            handleSubmit={handleSubmit(webDomainSubmitHandler)}
            isLoading={isLoading}
          />
        </div>
      </FormProvider>
    </CardWithTitle>
  );
};
