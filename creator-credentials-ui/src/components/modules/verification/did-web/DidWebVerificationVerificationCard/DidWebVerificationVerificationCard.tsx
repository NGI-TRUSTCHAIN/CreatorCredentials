import { Button } from 'flowbite-react';
import Link from 'next/link';
import React, { ElementType } from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { CardWithTitle } from '@/components/shared/CardWithTitle';
import { useDidWebVerificationContext } from '../DidWebVerificationContext';

export const DidWebVerificationVerificationCard = () => {
  const { t } = useTranslation('didweb-verification');

  const { userRole } = useDidWebVerificationContext();

  return (
    <CardWithTitle
      title={t('cards.verification.title')}
      description={t('cards.verification.description')}
    >
      <Button
        color="primary"
        className="self-start"
        href={`/${userRole.toLowerCase()}/verification`}
        as={Link as ElementType}
      >
        {t('close', { ns: 'common' })}
      </Button>
    </CardWithTitle>
  );
};
