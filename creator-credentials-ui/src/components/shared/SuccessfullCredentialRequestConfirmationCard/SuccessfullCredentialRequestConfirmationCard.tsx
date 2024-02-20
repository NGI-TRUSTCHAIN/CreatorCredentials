import { Card } from 'flowbite-react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { Icon } from '@/components/shared/Icon';
import { LinkButton } from '@/components/shared/LinkButton';

export const SuccessfullCredentialRequestConfirmationCard = () => {
  const { t } = useTranslation('credentials-request-success-card');

  return (
    <Card>
      <div>
        <Icon
          className="mb-5 h-16 w-16 fill-success"
          icon="CheckCircleFilled"
        />
        <div className="mb-8">
          <h3 className="mb-4 text-xl">{t('success-card.title')}</h3>
          <p className="text-base text-grey-4">
            {t('success-card.description')}
          </p>
        </div>
        <footer className="w-fit">
          <LinkButton
            color="primary"
            href="/creator/credentials"
          >
            {t('success-card.back-button')}
          </LinkButton>
        </footer>
      </div>
    </Card>
  );
};
