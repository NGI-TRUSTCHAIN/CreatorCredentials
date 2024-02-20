import { Card } from 'flowbite-react';
import React from 'react';
import { ClassValue, clsxm } from '@/shared/utils/clsxm';

type CardWithTitleProps = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  className?: string | ClassValue;
};

export const CardWithTitle = ({
  children,
  title,
  description,
  className,
}: CardWithTitleProps) => (
  <Card className={clsxm('overflow-hidden', className)}>
    <article className="flex flex-col gap-3">
      <header className="flex flex-col gap-4">
        <h3 className="text-xl">
          <p>{title}</p>
        </h3>
        {description && <h4 className="text-lg text-grey-4">{description}</h4>}
      </header>
      <div className="flex flex-col">{children}</div>
    </article>
  </Card>
);
