import React from 'react';
import { Toast } from 'flowbite-react';
import { clsxm } from '@/shared/utils/clsxm';
import { Icon, IconName } from '@/components/shared/Icon';

type ToastCardProps = {
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  iconName: IconName;
};

export const ToastCard = ({
  children,
  iconName,
  className,
  iconClassName,
}: ToastCardProps) => (
  <Toast>
    <div
      className={clsxm(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1.5',
        iconClassName,
      )}
    >
      <Icon
        icon={iconName}
        className="h-full w-full"
      />
    </div>
    <div className={clsxm('ml-3 font-normal text-black', className)}>
      {children}
    </div>
    <Toast.Toggle />
  </Toast>
);
