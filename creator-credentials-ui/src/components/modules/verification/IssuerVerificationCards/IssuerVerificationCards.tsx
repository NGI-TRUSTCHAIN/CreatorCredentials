import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { useIssuerVerifications } from '@/api/queries/useIssuerVerifications';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { UserRole } from '@/shared/typings/UserRole';
import { downloadJson } from '@/shared/utils/downloadJson';
import { DomainVerificationCard } from '../DomainVerificationCard';
import { DidWebVerificationCard } from '../did-web/DidWebVerificationCard';
import { EmailVerificationCard } from '../EmailVerificationCard';

export const IssuerVerificationCards = () => {
  // additional ready will state if translations are loaded or not
  const { t } = useTranslation('verification-cards', {
    useSuspense: false,
  });

  const { data, isFetching, isLoading, status } = useIssuerVerifications({
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <section className="grid grid-cols-3 gap-4">
      <EmailVerificationCard
        email={data.emailCredential.data.address}
        dropdownItems={[
          {
            onClick: () =>
              downloadJson(
                `${data.emailCredential.data.address} ${data.emailCredential.data.credentialObject.validFrom}`,
                data.emailCredential.data.credentialObject,
              ),
            children: t('download', { ns: 'common' }),
          },
        ]}
      />
      <DomainVerificationCard
        value={data.credentials.domain?.data.domain}
        status={data.credentials.domain?.status}
        dropdownItems={[]}
        userRole={UserRole.Issuer}
      />
      <DidWebVerificationCard
        value={data.credentials.didWeb?.data.domain}
        status={data.credentials.didWeb?.status}
        dropdownItems={[]}
        userRole={UserRole.Issuer}
      />
    </section>
  );
};
