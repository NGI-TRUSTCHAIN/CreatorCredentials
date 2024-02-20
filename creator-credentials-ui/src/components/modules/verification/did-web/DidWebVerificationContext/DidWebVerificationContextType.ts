import { UserRole } from '@/shared/typings/UserRole';

export type DidWebVerificationStep = 'domain' | 'json-file' | 'verification';

export type DidWebVerificationContextType = {
  currentStep: DidWebVerificationStep;
  currentJsonFileContent: string;
  domainAddress: string;
  userRole: UserRole;
  setCurrentStep: (step: DidWebVerificationStep) => void;
  setJsonFileContent: (jsonFileContent: string) => void;
  setDomainAddress: (domainAddress: string) => void;
};
