import { useTranslation } from '@/shared/utils/useTranslation';
import { HomeCard } from '../../HomeCard';

export const CreatorWelcomeCard = () => {
  const { t } = useTranslation('home-creator');

  return (
    <HomeCard title={t('welcome.title')}>
      <p className="text-lg text-grey-4">{t('welcome.subtitle')}</p>
    </HomeCard>
  );
};
