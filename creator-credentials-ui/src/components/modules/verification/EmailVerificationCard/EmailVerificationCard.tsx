import { DropdownItemProps } from 'flowbite-react';
import { ElementType } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CardWithBadge } from '@/components/shared/CardWithBadge';
import { ColoredBadge } from '@/components/shared/ColoredBadge';

type EmailVerificationCardProps = {
  dropdownItems?: DropdownItemProps<ElementType>[];
  email?: string;
};

export const EmailVerificationCard = ({
  email,
  dropdownItems = [],
}: EmailVerificationCardProps) => {
  const { t } = useTranslation('verification-cards');

  return (
    <CardWithBadge
      badgeType="verification"
      title={t('e-mail.title')}
      image={{
        iconName: 'Mail',
      }}
      className="flex-1"
      dropdownItems={dropdownItems}
      content={
        <CardWithBadge.ContentWithIcon iconName="Mail">
          {email}
        </CardWithBadge.ContentWithIcon>
      }
      footer={
        <ColoredBadge
          badgeType="verified"
          className="self-center"
        />
      }
    />
  );
};
