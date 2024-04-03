import React from 'react';
import { Button } from 'flowbite-react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Creator } from '@/shared/typings/Creator';
import { useAcceptCreatorConnectionRequest } from '@/api/mutations/useAcceptCreatorConnectionRequest';
import { useRejectCreatorConnectionRequest } from '@/api/mutations/useRejectCreatorConnectionRequest';
import { useToast } from '@/shared/hooks/useToast';
import { QueryKeys } from '@/api/queryKeys';
import { CreatorVerificationStatus } from '@/shared/typings/CreatorVerificationStatus';

type CreatorCardAcceptRejectFooterProps = {
  creator: Creator;
  onSuccessfullAcceptation?: () => void | Promise<void>;
  onSuccessfulRejection?: () => void | Promise<void>;
};

export const CreatorCardAcceptRejectFooter = ({
  creator,
  onSuccessfullAcceptation,
  onSuccessfulRejection,
}: CreatorCardAcceptRejectFooterProps) => {
  const { t } = useTranslation('issuer-creators');
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: acceptAsync, isLoading: isAccepting } =
    useAcceptCreatorConnectionRequest({
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.issuerCreators,
          { status: CreatorVerificationStatus.Pending },
        ]);
      },
    });

  const { mutateAsync: rejectAsync, isLoading: isRejecting } =
    useRejectCreatorConnectionRequest({
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.issuerCreators,
          { status: CreatorVerificationStatus.Pending },
        ]);
      },
    });

  const acceptButtonHandler = async () => {
    try {
      await acceptAsync({ creatorId: creator.id });
      await onSuccessfullAcceptation?.();
    } catch (error) {
      toast.error(t('requests.errors.accept-failed'));
    }
  };

  const rejectButtonHandler = async () => {
    try {
      await rejectAsync({ creatorId: creator.id });
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
