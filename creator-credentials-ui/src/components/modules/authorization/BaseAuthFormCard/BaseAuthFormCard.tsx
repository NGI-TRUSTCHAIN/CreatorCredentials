import { Card } from 'flowbite-react';
import React from 'react';

type BaseAuthFormCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export const BaseAuthFormCard = ({
  title,
  subtitle,
  children,
}: BaseAuthFormCardProps) => (
  <Card className="w-[39rem] overflow-hidden">
    <section className="flex flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl">
          <p>{title}</p>
        </h2>
        <h3>
          <p>{subtitle}</p>
        </h3>
      </header>
      <div className="flex justify-center">{children}</div>
    </section>
  </Card>
);
