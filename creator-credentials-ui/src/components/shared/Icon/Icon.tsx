import { useMemo } from 'react';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';
import { icons } from './icons';

export type IconName = keyof typeof icons;

interface Props {
  icon: IconName;
  className?: string | ClassValue;
}

export const Icon = ({ icon, className }: Props) => {
  const SvgIcon = useMemo(() => icons[icon], [icon]);
  const isSSR = typeof window === 'undefined';

  return (
    <i
      className={clsxm(
        'flex h-5 w-5 items-center justify-center stroke-2',
        className,
      )}
      aria-hidden="true"
      role="img"
      //title={icon}
    >
      {!isSSR && <SvgIcon />}
    </i>
  );
};
