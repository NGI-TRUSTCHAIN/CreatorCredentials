import { Button } from 'flowbite-react';
import Link from 'next/link';
import React, { ElementType } from 'react';
import { Icon } from '../Icon';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  closeButtonHref?: string;
  buttons?: React.ReactNode;
};

export const PageHeader = ({
  title,
  subtitle,
  closeButtonHref,
  buttons,
}: PageHeaderProps) => (
  <header className="relative mb-6 flex flex-col gap-4 text-black">
    <div className="flex gap-11">
      <h1 className="text-2xl">{title}</h1>
      {buttons}
    </div>
    {subtitle && <h2 className="text-lg">{subtitle}</h2>}
    {closeButtonHref && (
      <aside className="absolute -left-14">
        <Button
          color="black"
          href={closeButtonHref}
          as={Link as ElementType}
          size="xs"
        >
          <Icon icon="ArrowLeft" />
        </Button>
      </aside>
    )}
  </header>
);
