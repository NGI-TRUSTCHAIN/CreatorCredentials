import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { LinkButton } from '@/components/shared/LinkButton';

export const CredentialsRequestNoIssuersCard = () => {
  const { t } = useTranslation('creator-credentials-request');

  return (
    <CardWithTitle
      title={t('steps.select-issuer.no-connected-issuers.title')}
      description={t('steps.select-issuer.no-connected-issuers.description')}
      className="mt-8"
    >
      <LinkButton
        href="/creator/issuers"
        color="primary"
        className="mt-8 self-start"
      >
        {t('steps.select-issuer.no-connected-issuers.button')}
      </LinkButton>
    </CardWithTitle>
  );
};
