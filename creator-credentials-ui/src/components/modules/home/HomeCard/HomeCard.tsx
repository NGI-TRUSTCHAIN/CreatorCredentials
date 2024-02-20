import { Card } from 'flowbite-react';
import React from 'react';
import { Icon } from '@/components/shared/Icon';
import { BadgeType } from '@/shared/typings/BadgeType';
import { ColoredBadge } from '@/components/shared/ColoredBadge';

type HomeCardProps = {
  title: string;
  children: React.ReactNode;
  renderFooter?: (renderProps: { icon: React.ReactNode }) => React.ReactNode;
  className?: string;
  badgeType?: BadgeType;
};

export const HomeCard = ({
  className,
  badgeType,
  renderFooter,
  children,
  title,
}: HomeCardProps) => {
  return (
    <Card className={className}>
      <article className="flex flex-1 flex-col gap-3 text-black">
        <header className="flex flex-col gap-3">
          {badgeType && (
            <ColoredBadge
              className="self-start"
              badgeType={badgeType}
            />
          )}
          <h3 className="text-xl">{title}</h3>
        </header>
        <div className="flex-1 text-lg text-grey-4">{children}</div>
        {renderFooter && (
          <footer>
            {renderFooter({
              icon: (
                <Icon
                  icon="ArrowRight"
                  className="ms-2 h-4 w-4"
                />
              ),
            })}
          </footer>
        )}
      </article>
    </Card>
  );
};
