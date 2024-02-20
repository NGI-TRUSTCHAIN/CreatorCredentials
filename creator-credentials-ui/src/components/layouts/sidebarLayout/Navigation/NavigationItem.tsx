import { Sidebar } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/shared/utils/useTranslation';
import { NavLink } from '@/components/shared/NavLink';
import { Icon } from '@/components/shared/Icon';
import { clsxm } from '@/shared/utils/clsxm';
import { NavigationRoute } from './NavigationRoute';

type NavigationItemCountBadgeProps = {
  children: React.ReactNode;
};

const NavigationItemCountBadge = ({
  children,
}: NavigationItemCountBadgeProps) => (
  <div className="absolute top-1 ms-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-alert text-center text-xs font-normal text-white">
    {children}
  </div>
);

export const NavigationItem = ({
  labelKey,
  iconName,
  activeIconName,
  href,
  exact,
  suffixComponent,
  className,
  ...linkProps
}: NavigationRoute) => {
  const { t } = useTranslation('common');

  const { asPath } = useRouter();

  const isActive = exact
    ? asPath === href.toString()
    : asPath.startsWith(href.toString());

  return (
    <Sidebar.Item
      as={NavLink}
      icon={() =>
        iconName && activeIconName ? (
          <Icon
            icon={isActive ? activeIconName : iconName}
            className="fill-black"
          />
        ) : null
      }
      isActive={isActive}
      href={href}
      className={clsxm('relative', className)}
      {...linkProps}
    >
      <span>{t(labelKey)}</span>
      {suffixComponent}
    </Sidebar.Item>
  );
};

NavigationItem.CountBadge = NavigationItemCountBadge;
