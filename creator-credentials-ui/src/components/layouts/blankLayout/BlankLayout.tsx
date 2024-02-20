import React from 'react';
import { BrandImage } from '@/components/shared/BrandImage';

type BlankLayoutProps = {
  children: React.ReactNode;
};

export const BlankLayout = ({ children }: BlankLayoutProps) => (
  <div className="relative flex h-full flex-col overflow-auto pb-16">
    <BrandImage containerClassName="start-[3.5rem] top-8" />
    <main className="flex flex-1 flex-col items-center">{children}</main>
  </div>
);
