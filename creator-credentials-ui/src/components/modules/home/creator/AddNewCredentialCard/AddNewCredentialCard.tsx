import { useTranslation } from '@/shared/utils/useTranslation';
import { HomeCard } from '@/components/modules/home/HomeCard';
import { LinkButton } from '@/components/shared/LinkButton';

type AddNewCredentialCardProps = {
  className?: string;
};

export const AddNewCredentialCard = ({
  className,
}: AddNewCredentialCardProps) => {
  const { t } = useTranslation('home-creator');

  // TODO: Replace with query after credentials implementation
  const hasCredentials = false;

  return (
    <HomeCard
      title={t('add-credential.title')}
      className={className}
      badgeType="credential"
      renderFooter={({ icon }) => (
        <LinkButton
          color="primary"
          href="/credentials"
          className="inline"
          disabled={!hasCredentials}
        >
          {t('add', { ns: 'common' })}
          {icon}
        </LinkButton>
      )}
    >
      <p className="text-lg text-grey-4">{t('add-credential.subtitle')}</p>
    </HomeCard>
  );
};
