import React from 'react';
import { DomainVerificationEnterDomainCard } from '../DomainVerificationEnterDomainCard';
import { DomainVerificationUpdateTxtRecordCard } from '../DomainVerificationUpdateTxtRecordCard';
import { DomainVerificationVerificationCard } from '../DomainVerificationVerificationCard/DomainVerificationVerificationCard';
import { useDomainVerificationContext } from '../DomainVerificationContext';
import { DomainVerificationStep } from '../DomainVerificationContext/DomainVerificationContext.types';

export const DomainVerificationFormWrapper = () => {
  const { currentStep } = useDomainVerificationContext();

  return (
    <section className="flex flex-col gap-4">
      <DomainVerificationEnterDomainCard />
      {(['text-record', 'verification'] as DomainVerificationStep[]).includes(
        currentStep,
      ) && <DomainVerificationUpdateTxtRecordCard />}
      {currentStep === 'verification' && <DomainVerificationVerificationCard />}
    </section>
  );
};
