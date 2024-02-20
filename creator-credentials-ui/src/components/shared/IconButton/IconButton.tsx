import React, { forwardRef } from 'react';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { Icon, IconName } from '../Icon';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName;
  className?: string | ClassValue;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, onClick, ...restProps }, ref) => (
    <button
      onClick={onClick}
      className={clsxm('p-2', className)}
      ref={ref}
      {...restProps}
    >
      <Icon
        icon={icon}
        className="h-6 w-6"
      />
    </button>
  ),
);

IconButton.displayName = 'IconButton';
