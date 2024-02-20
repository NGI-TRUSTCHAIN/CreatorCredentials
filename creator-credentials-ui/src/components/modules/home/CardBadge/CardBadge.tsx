import React from 'react';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { IconName, Icon } from '@/components/shared/Icon';

type CardBadgeProps = {
  children: React.ReactNode;
  iconName: IconName;
  className?: ClassValue;
};

export const CardBadge = ({
  children,
  iconName,
  className,
}: CardBadgeProps) => (
  <div
    className={clsxm(
      'inline-flex items-center justify-center self-start rounded-md py-[0.3rem]',
      className,
    )}
    aria-hidden="true"
  >
    <Icon
      icon={iconName}
      className="me-2 h-4 w-4"
    />
    <span className="text-sm">{children}</span>
  </div>
);
