import React from 'react';
import { ToastCard } from './ToastCard';

type SuccessToastProps = {
  children: React.ReactNode;
};

export const SuccessToast = ({ children }: SuccessToastProps) => (
  <ToastCard
    iconName="Check"
    iconClassName="bg-success/20 fill-success"
  >
    {children}
  </ToastCard>
);
