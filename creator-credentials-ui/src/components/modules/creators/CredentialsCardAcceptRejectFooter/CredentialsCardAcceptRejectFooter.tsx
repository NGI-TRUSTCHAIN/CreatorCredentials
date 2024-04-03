import React from 'react';
import { Button } from 'flowbite-react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useToast } from '@/shared/hooks/useToast';
import { QueryKeys } from '@/api/queryKeys';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { useAcceptCredentialsIssuanceRequest } from '@/api/mutations/useAcceptCredentialsIssuanceRequest';
import { useRejectCredentialsIssuanceRequest } from '@/api/mutations/useRejectCredentialsIssuanceRequest';

type CredentialsCardAcceptRejectFooterProps = {
  credential: VerifiedCredentialsUnion;
  onSuccessfullAcceptation?: () => void | Promise<void>;
  onSuccessfulRejection?: () => void | Promise<void>;
};

export const CredentialsCardAcceptRejectFooter = ({
  credential,
  onSuccessfullAcceptation,
  onSuccessfulRejection,
}: CredentialsCardAcceptRejectFooterProps) => {
  const { t } = useTranslation('issuer-creators');
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: acceptAsync, isLoading: isAccepting } =
    useAcceptCredentialsIssuanceRequest({
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.issuersCredentials,
          { status: CreatorVerificationStatus.Pending },
        ]);
      },
    });

  const { mutateAsync: rejectAsync, isLoading: isRejecting } =
    useRejectCredentialsIssuanceRequest({
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.issuersCredentials,
          { status: CredentialVerificationStatus.Pending },
        ]);
      },
    });

  const acceptButtonHandler = async () => {
    try {
      await acceptAsync({ credentialId: credential.id });
      await onSuccessfullAcceptation?.();
    } catch (error) {
      toast.error(t('requests.errors.accept-failed'));
    }
  };

  const rejectButtonHandler = async () => {
    try {
      await rejectAsync({ credentialId: credential.id });
      await onSuccessfulRejection?.();
    } catch (error) {
      toast.error(t('requests.errors.reject-failed'));
    }
  };

  const disableButtons = isAccepting || isRejecting;

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        color="primary"
        disabled={disableButtons}
        isProcessing={isAccepting}
        onClick={acceptButtonHandler}
      >
        {t('accept', { ns: 'common' })}
      </Button>
      <Button
        color="outline"
        disabled={disableButtons}
        isProcessing={isRejecting}
        onClick={rejectButtonHandler}
      >
        {t('reject', { ns: 'common' })}
      </Button>
    </div>
  );
};
