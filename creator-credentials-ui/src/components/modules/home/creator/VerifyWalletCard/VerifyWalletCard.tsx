import { Button } from 'flowbite-react';
import { ElementType } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/shared/utils/useTranslation';
import { HomeCard } from '@/components/modules/home/HomeCard';

type VerifyWalletCardProps = {
  className?: string;
};

export const VerifyWalletCard = ({ className }: VerifyWalletCardProps) => {
  const { t } = useTranslation('home-creator');

  return (
    <HomeCard
      title={t('verify-wallet.title')}
      className={className}
      badgeType="verification"
      renderFooter={({ icon }) => (
        <Button
          color="primary"
          href="/verification"
          as={Link as ElementType}
          className="inline"
        >
          {t('start', { ns: 'common' })}
          {icon}
        </Button>
      )}
    >
      <p className="text-lg text-grey-4">{t('verify-wallet.subtitle')}</p>
    </HomeCard>
  );
};
