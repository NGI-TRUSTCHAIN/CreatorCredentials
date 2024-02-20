import { Sidebar } from 'flowbite-react';
import { useEffect, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserRole } from '@/shared/typings/UserRole';
import { BrandImage } from '@/components/shared/BrandImage';
import { CreatorNavigationItems } from './CreatorNavigationItems';
import { IssuerNavigationItems } from './IssuerNavigationItems';

export const Navigation = () => {
  const user = useUser();

  useEffect(() => {
    if (!user.user?.publicMetadata.role) {
      user.user?.reload();
    }
  }, [user]);

  const NavigationItems = useMemo(() => {
    switch (user.user?.publicMetadata.role) {
      case UserRole.Creator:
        return CreatorNavigationItems;
      case UserRole.Issuer:
        return IssuerNavigationItems;
      default:
        return null;
    }
  }, [user]);

  return (
    <Sidebar className="flex w-[11.5rem] flex-col border-e-2 border-gray-200">
      <Sidebar.Items className="h-full">
        <Sidebar.ItemGroup className="relative flex h-full flex-col justify-between">
          <BrandImage containerClassName="left-0 right-0 top-4 m-auto" />
          {NavigationItems && <NavigationItems />}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
