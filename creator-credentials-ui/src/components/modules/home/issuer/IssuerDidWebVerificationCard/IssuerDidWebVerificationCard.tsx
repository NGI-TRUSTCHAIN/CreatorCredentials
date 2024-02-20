import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { LinkButton } from '@/components/shared/LinkButton';
import { HomeCard } from '../../HomeCard';

export const IssuerDidWebVerificationCard = () => {
  const { t } = useTranslation('home-issuer');

  return (
    <HomeCard
      className="flex-1"
      title={t('did-web.title')}
      badgeType="verification"
      renderFooter={({ icon }) => (
        <LinkButton
          color="primary"
          href="/issuer/verification"
          className="inline"
        >
          {t('verify', { ns: 'common' })}
          {icon}
        </LinkButton>
      )}
    >
      {t('did-web.content')}
    </HomeCard>
  );
};
