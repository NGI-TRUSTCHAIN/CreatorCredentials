import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { UserRole } from '@/shared/typings/UserRole';
import { LinkButton } from '../LinkButton';
import { Icon } from '../Icon';

type Props = {
  userRole: UserRole;
};

export const TemporaryLogInButton = ({ userRole }: Props) => {
  const { t } = useTranslation('common');

  return (
    <LinkButton
      color="primary"
      href={`/auth/signin/email?code=${userRole.toLowerCase()}`}
    >
      {t('log-in')}
      <Icon
        icon="ArrowRight"
        className="ms-2"
      />
    </LinkButton>
  );
};
