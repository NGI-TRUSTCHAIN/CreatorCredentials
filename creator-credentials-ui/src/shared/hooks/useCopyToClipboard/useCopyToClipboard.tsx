import { useCallback } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useToast } from '../useToast';

type UseClipboardProps = {
  displayToast?: boolean;
};

export const useCopyToClipboard = ({
  displayToast = true,
}: UseClipboardProps = {}) => {
  const { t } = useTranslation('common');
  const toast = useToast();

  const copy = useCallback(
    async (value: string | number): Promise<boolean> => {
      try {
        if (!navigator.clipboard) {
          console.warn('Clipboard API not available');
          if (displayToast) {
            toast.warning(t('copy-to-clipboard.warning'));
          }
          return false;
        }

        await navigator.clipboard.writeText(value.toString());
        if (displayToast) {
          toast.info(t('copy-to-clipboard.info'));
        }
        return true;
      } catch (err) {
        console.error('Failed to copy: ', err);
        if (displayToast) {
          toast.error(t('copy-to-clipboard.error'));
        }
        return false;
      }
    },
    [displayToast, toast, t],
  );

  return {
    copy,
  };
};
