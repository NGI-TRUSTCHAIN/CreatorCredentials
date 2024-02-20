import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';

export const DidWebVerificationJsonFileStepsDescription = () => {
  const { t } = useTranslation('didweb-verification');

  return (
    <div className="text-lg text-grey-4">
      <p>{t('cards.json-file.steps.title')}</p>
      <br />
      <ol className="list-outside list-decimal px-5">
        <li>{t('cards.json-file.steps.1')}</li>
        <li>{t('cards.json-file.steps.2')}</li>
        <li>{t('cards.json-file.steps.3')}</li>
      </ol>
    </div>
  );
};
