import { Button, ButtonProps } from 'flowbite-react';
import Link, { LinkProps } from 'next/link';
import React, { ElementType } from 'react';
import { clsxm } from '@/shared/utils/clsxm';

export type LinkButtonProps = Omit<ButtonProps & LinkProps, 'as'>;

export const LinkButton = ({
  disabled,
  children,
  className,
  ...restProps
}: LinkButtonProps) => (
  <Button
    as={Link as ElementType}
    className={clsxm(
      {
        'anchor__button--disabled': disabled,
      },
      className,
    )}
    aria-disabled={disabled}
    {...restProps}
  >
    {children}
  </Button>
);
