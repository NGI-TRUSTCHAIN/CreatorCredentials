import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { UserRole } from '@/shared/typings/UserRole';
import { downloadJson } from '@/shared/utils/downloadJson';
import { useIssuerCredentials } from '@/api/queries/useIssuerCredentials';
import { DomainVerificationCard } from '../DomainVerificationCard';
import { DidWebVerificationCard } from '../did-web/DidWebVerificationCard';
import { EmailVerificationCard } from '../EmailVerificationCard';

export const IssuerVerificationCards = () => {
  // additional ready will state if translations are loaded or not
  const { t } = useTranslation('verification-cards', {
    useSuspense: false,
  });

  const {
    data: credentials,
    isFetching,
    isLoading,
    status,
  } = useIssuerCredentials({
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }
  const email = credentials.email.data.address;
  const domain = credentials.domain?.data.domain;
  const didWeb = credentials.didWeb?.data.domain;
  const emailCredentialObject = credentials.email.data.credentialObject;
  const domainCredentialObject = credentials.domain?.data.credentialObject;
  const didWebCredentialObject = credentials.didWeb?.data.credentialObject;
  return (
    <section className="grid grid-cols-3 gap-4">
      <EmailVerificationCard
        email={email}
        dropdownItems={[
          {
            onClick: () =>
              downloadJson(
                `${email} ${emailCredentialObject.validFrom}`,
                emailCredentialObject,
              ),
            children: t('download', { ns: 'common' }),
          },
        ]}
      />
      <DomainVerificationCard
        value={credentials.domain?.data.domain}
        status={credentials.domain?.status}
        dropdownItems={[
          {
            onClick: () =>
              downloadJson(
                `${domain} ${domainCredentialObject.validFrom}`,
                domainCredentialObject,
              ),
            children: t('download', { ns: 'common' }),
          },
        ]}
        userRole={UserRole.Issuer}
      />
      <DidWebVerificationCard
        value={credentials.didWeb?.data.domain}
        status={credentials.didWeb?.status}
        dropdownItems={[
          {
            onClick: () =>
              downloadJson(
                `${didWeb} ${didWebCredentialObject.validFrom}`,
                didWebCredentialObject,
              ),
            children: t('download', { ns: 'common' }),
          },
        ]}
        userRole={UserRole.Issuer}
      />
    </section>
  );
};
