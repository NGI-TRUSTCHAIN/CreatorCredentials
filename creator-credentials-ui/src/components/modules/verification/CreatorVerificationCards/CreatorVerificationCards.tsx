import React from 'react';
import { useTranslation } from '@/shared/utils/useTranslation';
import { ApiErrorMessage } from '@/components/shared/ApiErrorMessage';
import { Loader } from '@/components/shared/Loader';
import { UserRole } from '@/shared/typings/UserRole';
import { useCreatorCredentials } from '@/api/queries/useCreatorCredentials';
import { DomainVerificationCard } from '../DomainVerificationCard';
import { EmailVerificationCard } from '../EmailVerificationCard';
import { MetamaskVerificationCard } from '../MetamaskVerificationCard';

export const CreatorVerificationCards = () => {
  const { t } = useTranslation('creator-verification');

  const {
    data: verifiableCredentials,
    isLoading,
    status,
  } = useCreatorCredentials({
    staleTime: 1000 * 60 * 1, // 1 minute
  });

  if (status === 'error') {
    return <ApiErrorMessage message={t('errors.fetching-credentials')} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="grid grid-cols-3 gap-4">
      <EmailVerificationCard
        email={verifiableCredentials?.email.data.address}
      />
      <MetamaskVerificationCard
        walletAddress={verifiableCredentials?.wallet?.data.address}
      />
      <DomainVerificationCard
        value={verifiableCredentials?.domain?.data.domain}
        status={verifiableCredentials?.domain?.status}
        userRole={UserRole.Creator}
      />
    </section>
  );
};
