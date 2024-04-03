import React, { useMemo } from 'react';
// import { useTranslation } from '@/shared/utils/useTranslation';
import { Issuer } from '@/shared/typings/Issuer';
import { IssuerDetailsCard } from '@/components/shared/IssuerDetailsCard';

type AvailableIssuersProps = {
  issuers: Issuer[];
};

export const AvailableIssuers = ({ issuers }: AvailableIssuersProps) => {
  // const { t } = useTranslation('creator-issuers');

  const { commonIssuers } = useMemo(
    () =>
      issuers.reduce<{
        commonIssuers: Issuer[];
        additionalVerificationIssuers: Issuer[];
      }>(
        (acc, curr) => {
          const { commonIssuers, additionalVerificationIssuers } = acc;

          if (curr.additionalVerificationSteps) {
            return {
              ...acc,
              additionalVerificationIssuers: [
                ...additionalVerificationIssuers,
                curr,
              ],
            };
          }

          return {
            ...acc,
            commonIssuers: [...commonIssuers, curr],
          };
        },
        {
          commonIssuers: [],
          additionalVerificationIssuers: [],
        },
      ),
    [issuers],
  );

  return (
    <>
      <section>
        {/* <h3 className="my-4 text-lg">{t('list-of-available')}</h3> */}
        <div className="grid grid-cols-3 gap-4">
          {commonIssuers.map((issuer) => (
            <IssuerDetailsCard
              key={issuer.id}
              issuer={issuer}
            />
          ))}
        </div>
      </section>
      {/* <section>
        <h3 className="mb-4 mt-6 text-lg">{t('list-of-additional')}</h3>
        <div className="grid grid-cols-3 gap-4">
          {additionalVerificationIssuers.map((issuer) => (
            <IssuerDetailsCard
              key={issuer.id}
              issuer={issuer}
            />
          ))}
        </div>
      </section> */}
    </>
  );
};
