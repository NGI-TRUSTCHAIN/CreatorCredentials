import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';

export interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: ClassValue;
  disabled?: boolean;
  isActive?: boolean;
}

export const NavLink = ({
  className,
  children,
  disabled,
  isActive,
  href,
}: LinkProps) => (
  <NextLink
    href={href}
    className={clsxm(className, {
      'font-bold': isActive,
      'anchor__button--disabled': disabled,
    })}
  >
    {children}
  </NextLink>
);
