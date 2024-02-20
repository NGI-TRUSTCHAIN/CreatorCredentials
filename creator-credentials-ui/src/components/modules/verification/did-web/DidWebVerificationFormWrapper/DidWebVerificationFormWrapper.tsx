import React from 'react';
import { DidWebVerificationEnterDomainCard } from '../DidWebVerificationEnterDomainCard';
import { DidWebVerificationJsonFileCard } from '../DidWebVerificationJsonFileCard';
import { DidWebVerificationVerificationCard } from '../DidWebVerificationVerificationCard';
import { useDidWebVerificationContext } from '../DidWebVerificationContext';
import { DidWebVerificationStep } from '../DidWebVerificationContext/DidWebVerificationContextType';

export const DidWebVerificationFormWrapper = () => {
  const { currentStep } = useDidWebVerificationContext();

  return (
    <section className="flex flex-col gap-4">
      <DidWebVerificationEnterDomainCard />
      {(['json-file', 'verification'] as DidWebVerificationStep[]).includes(
        currentStep,
      ) && <DidWebVerificationJsonFileCard />}
      {currentStep === 'verification' && <DidWebVerificationVerificationCard />}
    </section>
  );
};
