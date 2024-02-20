import { UserRole } from '@/shared/typings/UserRole';

export type DomainVerificationStep = 'domain' | 'text-record' | 'verification';

export type DomainVerificationContextType = {
  currentStep: DomainVerificationStep;
  txtRecord: string;
  domainAddress: string;
  userRole: UserRole;
  setCurrentStep: (step: DomainVerificationStep) => void;
  setTxtRecord: (txtRecord: string) => void;
  setDomainAddress: (domainAddress: string) => void;
};
