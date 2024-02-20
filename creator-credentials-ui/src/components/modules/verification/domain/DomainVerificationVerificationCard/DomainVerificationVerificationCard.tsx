import { Button } from 'flowbite-react';
import React, { ElementType } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { useDomainVerificationContext } from '../DomainVerificationContext';

export const DomainVerificationVerificationCard = () => {
  const { t } = useTranslation('domain-verification');

  const { userRole } = useDomainVerificationContext();

  return (
    <CardWithTitle
      title={t('cards.dns-record-verification.title')}
      description={t('cards.dns-record-verification.description')}
    >
      <Button
        color="primary"
        className="self-start"
        href={`/${userRole.toLowerCase()}/verification`}
        as={Link as ElementType}
      >
        {t('cards.dns-record-verification.button')}
      </Button>
    </CardWithTitle>
  );
};
