import { Button, DropdownItemProps } from 'flowbite-react';
import Link from 'next/link';
import { ElementType, useCallback } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CardWithBadge } from '@/components/shared/CardWithBadge';
import { CredentialVerificationStatus } from '@/shared/typings/CredentialVerificationStatus';
import { ColoredBadge } from '@/components/shared/ColoredBadge';
import { UserRole } from '@/shared/typings/UserRole';
import { useDisconnectDomain } from '@/api/mutations/useDisconnectDomain';

type DomainVerificationCardProps = {
  value?: string | null;
  status?: CredentialVerificationStatus;
  userRole: UserRole;
  dropdownItems?: DropdownItemProps<ElementType>[];
};

export const DomainVerificationCard = ({
  value,
  status,
  userRole,
  dropdownItems,
}: DomainVerificationCardProps) => {
  const { t } = useTranslation('verification-cards');

  const { mutate } = useDisconnectDomain();

  const renderFooter = useCallback(() => {
    const disconnectButtonHandler = () => {
      mutate();
    };
    switch (status) {
      case CredentialVerificationStatus.Success:
        return (
          <>
            <Button
              color="primary"
              fullSized
              onClick={disconnectButtonHandler}
            >
              {t('disconnect', { ns: 'common' })}
            </Button>
            <ColoredBadge
              badgeType="verified"
              className="self-center"
            />
          </>
        );
      case CredentialVerificationStatus.Pending:
        return (
          <ColoredBadge
            badgeType="pending"
            className="self-center"
          />
        );
      default:
        return (
          <Button
            color="primary"
            fullSized
            href={`/${userRole.toLowerCase()}/verification/domain`}
            as={Link as ElementType}
          >
            {t('domain.buttons.start-verification')}
          </Button>
        );
    }
  }, [status, t, userRole, mutate]);

  return (
    <CardWithBadge
      badgeType="verification"
      title={t('domain.title')}
      image={{
        iconName: 'Public',
      }}
      dropdownItems={dropdownItems}
      className="flex-1"
      content={
        value && status ? (
          <CardWithBadge.ContentWithIcon
            iconName="Public"
            className="whitespace-pre-wrap"
          >
            {value}
          </CardWithBadge.ContentWithIcon>
        ) : (
          <p>{t('domain.description')}</p>
        )
      }
      footer={renderFooter()}
    />
  );
};
