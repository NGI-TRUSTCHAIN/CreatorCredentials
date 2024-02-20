import { joiResolver } from '@hookform/resolvers/joi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { useToast } from '@/shared/hooks/useToast';
import { useCreateTxtRecordForDomain } from '@/api/mutations/useCreateTxtRecordForDomain';
import { DomainVerificationEnterDomainForm } from '../DomainVerificationEnterDomainForm';
import { DomainVerificationEnterDomainFormContextType } from '../DomainVerificationEnterDomainForm/DomainVerificationEnterDomainFormContextType';
import { domainVerificationEnterDomainDefaultValues } from '../DomainVerificationEnterDomainForm/DomainVerificationEnterDomainFormDefaultValues';
import { DomainVerificationEnterDomainFormSchema } from '../DomainVerificationEnterDomainForm/DomainVerificationEnterDomainFormSchema';
import { useDomainVerificationContext } from '../DomainVerificationContext';

export const DomainVerificationEnterDomainCard = () => {
  const { t } = useTranslation('domain-verification');
  const { currentStep, setTxtRecord, setCurrentStep, setDomainAddress } =
    useDomainVerificationContext();
  const toast = useToast();

  const form = useForm<DomainVerificationEnterDomainFormContextType>({
    resolver: joiResolver(DomainVerificationEnterDomainFormSchema),
    defaultValues: domainVerificationEnterDomainDefaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit } = form;

  const { mutateAsync, isLoading } = useCreateTxtRecordForDomain();

  const webDomainSubmitHandler: SubmitHandler<
    DomainVerificationEnterDomainFormContextType
  > = async ({ domain }) => {
    try {
      setCurrentStep('domain');
      const { txtRecord } = await mutateAsync(domain);
      setDomainAddress(domain);
      setTxtRecord(txtRecord);
    } catch (error) {
      toast.error(t('errors.txt-record-creation'));
    }
  };

  return (
    <CardWithTitle title={t('cards.enter-domain.title')}>
      <FormProvider {...form}>
        <div className="w-[50%]">
          <DomainVerificationEnterDomainForm
            disabled={currentStep === 'verification'}
            handleSubmit={handleSubmit(webDomainSubmitHandler)}
            isLoading={isLoading}
          />
        </div>
      </FormProvider>
    </CardWithTitle>
  );
};
