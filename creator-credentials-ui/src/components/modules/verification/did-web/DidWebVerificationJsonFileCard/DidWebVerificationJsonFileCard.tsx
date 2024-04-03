import { useQueryClient } from '@tanstack/react-query';
import { Button, Textarea } from 'flowbite-react';
import { useMemo } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useConfirmDidWebJsonFileUpload } from '@/api/mutations/useConfirmDidWebJsonFileUpload';
import { QueryKeys } from '@/api/queryKeys';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { Icon } from '@/components/shared/Icon';
import { useDownloadStringToFile } from '@/shared/hooks/useDownloadStringToFile';
import { useToast } from '@/shared/hooks/useToast';
import { useDidWebVerificationContext } from '../DidWebVerificationContext';
import { DidWebVerificationJsonFileStepsDescription } from './DidWebVerificationJsonFileStepsDescription';

export const DidWebVerificationJsonFileCard = () => {
  const { t } = useTranslation('didweb-verification');
  const toast = useToast();
  const { downloadFile } = useDownloadStringToFile();
  const queryClient = useQueryClient();
  const { currentJsonFileContent, currentStep, setCurrentStep } =
    useDidWebVerificationContext();

  const { mutateAsync, isLoading } = useConfirmDidWebJsonFileUpload({
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.issuerCredentials]);
      // queryClient.setQueryData<GetIssuerCredentialsResponse>(
      //   [QueryKeys.issuerCredentials],
      //   (oldData) => {
      //     if (!oldData) return;

      //     const updatedData: GetIssuerCredentialsResponse = {
      //       ...oldData,
      //       didWeb: {
      //         ...oldData.didWeb,
      //         id: 'temp-id', // TODO: remove this when we have real id
      //         type: CredentialType.DidWeb,
      //         data: {
      //           domain: domainAddress,
      //         },
      //         status: CredentialVerificationStatus.Pending,
      //       },
      //     };

      //     return updatedData;
      //   },
      // );
    },
  });

  const handleDownloadClick = () => {
    try {
      downloadFile({
        content: currentJsonFileContent,
        fileName: 'did.json',
        mimeType: 'application/json',
      });
    } catch (error) {
      toast.error(t('errors.download-file'));
    }
  };

  const confirmButtonHandler = async () => {
    try {
      await mutateAsync();
      setCurrentStep('verification');
    } catch (error) {
      toast.error(t('errors.upload-confirmation'));
    }
  };

  const textAreaRows = useMemo(
    () => currentJsonFileContent.split('\n').length,
    [currentJsonFileContent],
  );

  return (
    <CardWithTitle title={t('cards.json-file.title')}>
      <div className="flex flex-col gap-6">
        <DidWebVerificationJsonFileStepsDescription />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">{t('cards.json-file.file-content.title')}</h3>
          <div className="flex items-center">
            <Textarea
              defaultValue={currentJsonFileContent}
              readOnly
              className="scrollbar flex-1 resize-none"
              rows={textAreaRows}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            color="outline"
            className="self-start"
            isProcessing={isLoading}
            disabled={currentStep === 'verification'}
            onClick={handleDownloadClick}
          >
            {t('cards.json-file.buttons.download')}
            <Icon
              icon="Download"
              className="ms-2"
            />
          </Button>
          <Button
            color="primary"
            className="self-start"
            onClick={confirmButtonHandler}
            isProcessing={isLoading}
            disabled={currentStep === 'verification'}
          >
            {t('cards.json-file.buttons.confirm-upload')}
          </Button>
        </div>
      </div>
    </CardWithTitle>
  );
};
