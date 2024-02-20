import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { FormFooter } from '@/components/shared/FormFooter';
import { Loader } from '@/components/shared/Loader';
import { Navigation } from './Navigation';

type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const session = useAuth();

  if (!session.isLoaded) {
    return <Loader />;
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Navigation />
        <div className="relative flex flex-1 flex-col">
          <div className="scrollbar z-50 flex flex-1 flex-col overflow-y-auto px-19 py-16">
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
          <FormFooter.PortalRoot />
        </div>
      </div>
    </div>
  );
};
