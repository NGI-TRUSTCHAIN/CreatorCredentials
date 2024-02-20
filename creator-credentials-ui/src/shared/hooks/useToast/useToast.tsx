import React, { useCallback } from 'react';
// eslint-disable-next-line no-restricted-imports
import toast from 'react-hot-toast';
import { ErrorToast } from '@/components/modules/toasts/ErrorToast';
import { SuccessToast } from '@/components/modules/toasts/SuccessToast';
import { InfoToast } from '@/components/modules/toasts/InfoToast';
import { WarningToast } from '@/components/modules/toasts/WarningToast';

export const useToast = () => {
  const error = useCallback(
    (message: string) => toast.custom(<ErrorToast>{message}</ErrorToast>),
    [],
  );

  const success = useCallback(
    (message: string) => toast.custom(<SuccessToast>{message}</SuccessToast>),
    [],
  );

  const info = useCallback(
    (message: string) => toast.custom(<InfoToast>{message}</InfoToast>),
    [],
  );

  const warning = useCallback(
    (message: string) => toast.custom(<WarningToast>{message}</WarningToast>),
    [],
  );

  return {
    error,
    success,
    info,
    warning,
  };
};
