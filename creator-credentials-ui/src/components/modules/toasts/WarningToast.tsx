import React from 'react';
import { ToastCard } from './ToastCard';

type SuccessToastProps = {
  children: React.ReactNode;
};

export const WarningToast = ({ children }: SuccessToastProps) => (
  <ToastCard
    iconName="Warning"
    iconClassName="bg-warning/20 fill-warning stroke-warning"
  >
    {children}
  </ToastCard>
);
