import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { HomeCard } from '@/components/modules/home/HomeCard';
import { LinkButton } from '@/components/shared/LinkButton';

export const IssuerVerifyDomainCard = () => {
  const { t } = useTranslation('home-issuer');

  return (
    <HomeCard
      className="flex-1"
      title={t('verify-domain.title')}
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
      {t('verify-domain.content')}
    </HomeCard>
  );
};
