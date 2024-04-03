import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'flowbite-react';
import { useId } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useConfirmDomainTxtRecordCreation } from '@/api/mutations/useConfirmDomainTxtRecordCreation';
import { QueryKeys } from '@/api/queryKeys';
import { FormLabel } from '@/components/formFields/FormLabel';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { IconButton } from '@/components/shared/IconButton/IconButton';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import { useToast } from '@/shared/hooks/useToast';
import { useDomainVerificationContext } from '../DomainVerificationContext';

export const DomainVerificationUpdateTxtRecordCard = () => {
  const { t } = useTranslation('domain-verification');
  const { copy } = useCopyToClipboard();
  const fieldId = useId();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { txtRecord, currentStep, setCurrentStep } =
    useDomainVerificationContext();

  const { mutateAsync, isLoading } = useConfirmDomainTxtRecordCreation({
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.issuerCredentials]);
    },
  });

  const contentCopyHandler = () => {
    copy(txtRecord);
  };

  const confirmButtonHandler = async () => {
    try {
      await mutateAsync();
      setCurrentStep('verification');
    } catch (error) {
      toast.error(t('errors.txt-record-update'));
    }
  };

  return (
    <CardWithTitle
      title={t('cards.update-txt-record.title')}
      description={t('cards.update-txt-record.description')}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <FormLabel htmlFor={fieldId}>
            {t('cards.update-txt-record.fields.txt-record.label')}
          </FormLabel>
          <div className="flex items-center">
            <Textarea
              defaultValue={txtRecord}
              readOnly
              className="flex-1 resize-none"
            />
            <IconButton
              icon="ContentCopy"
              onClick={contentCopyHandler}
              aria-label={t('copy-to-clipboard.label', { ns: 'common' })}
            />
          </div>
        </div>
        <Button
          color="primary"
          className="self-start"
          onClick={confirmButtonHandler}
          isProcessing={isLoading}
          disabled={currentStep === 'verification'}
        >
          {t('cards.update-txt-record.button')}
        </Button>
      </div>
    </CardWithTitle>
  );
};
