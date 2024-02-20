import React from 'react';
import { ToastCard } from './ToastCard';

type ErrorToastProps = {
  children: React.ReactNode;
};

export const ErrorToast = ({ children }: ErrorToastProps) => (
  <ToastCard
    iconName="Close"
    iconClassName="bg-alert/20 fill-alert"
  >
    {children}
  </ToastCard>
);
