import { IconName } from '@/components/shared/Icon';
import { ClassValue } from '@/shared/utils/clsxm';

export type NavigationRoute = {
  labelKey: string;
  href: string;
  iconName?: IconName;
  activeIconName?: IconName;
  exact?: boolean;
  suffixComponent?: React.ReactNode;
  className?: string | ClassValue;
};
