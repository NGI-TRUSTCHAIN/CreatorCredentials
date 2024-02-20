import React from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { config } from '@/shared/constants/config';

export type TermsAndConditionsTransProps = {
  agreed?: boolean;
};

export const TermsAndConditionsTrans = ({
  agreed,
}: TermsAndConditionsTransProps) => {
  const { t } = useTranslation('terms-and-conditions');

  const tKey = agreed ? 'label.agreed' : 'label.will-agree';

  return (
    <Trans
      i18nKey={tKey}
      t={t}
      components={{
        link1: (
          <a
            className="underline underline-offset-[3px]"
            href={config.TERMS_AND_CONDITIONS_URL}
            target="_blank"
          />
        ),
      }}
    />
  );
};
