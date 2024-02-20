import React from 'react';
import { clsxm } from '@/shared/utils/clsxm';

type CustomLabelProps = {
  error?: boolean;
  disabled?: boolean;
};

export type FormLabelProps = CustomLabelProps &
  React.LabelHTMLAttributes<HTMLLabelElement>;

export const FormLabel = ({
  children,
  error,
  className,
  disabled,
  ...htmlProps
}: FormLabelProps) => (
  <label
    className={clsxm(
      'text-sm font-normal',
      {
        'text-alert': error,
        'opacity-50': disabled,
      },
      className,
    )}
    {...htmlProps}
  >
    {children}
  </label>
);
