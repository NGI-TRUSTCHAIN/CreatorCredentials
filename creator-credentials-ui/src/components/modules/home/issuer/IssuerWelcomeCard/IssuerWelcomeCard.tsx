import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { HomeCard } from '@/components/modules/home/HomeCard';

export const IssuerWelcomeCard = () => {
  const { t } = useTranslation('home-issuer');

  return (
    <HomeCard title={t('welcome-card.title')}>
      {t('welcome-card.content')}
    </HomeCard>
  );
};
