import React from 'react';
import { ToastCard } from './ToastCard';

type SuccessToastProps = {
  children: React.ReactNode;
};

export const InfoToast = ({ children }: SuccessToastProps) => (
  <ToastCard
    iconName="Info"
    iconClassName="bg-primary/20 fill-primary"
  >
    {children}
  </ToastCard>
);
