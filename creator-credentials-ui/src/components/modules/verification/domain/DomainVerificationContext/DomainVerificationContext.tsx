import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { UserRole } from '@/shared/typings/UserRole';
import {
  DomainVerificationContextType,
  DomainVerificationStep,
} from './DomainVerificationContext.types';

export const DomainVerificationContext =
  createContext<DomainVerificationContextType | null>(null);

type IssuerSignupContextProviderProps = {
  children: React.ReactNode;
  userRole: UserRole;
};

export const DomainVerificationContextProvider = ({
  children,
  userRole,
}: IssuerSignupContextProviderProps) => {
  const [currentStep, setCurrentStep] =
    useState<DomainVerificationStep>('domain');
  const [currentTxtRecord, setCurrentTxtRecord] = useState<string>('');
  const [domainAddress, setDomainAddress] = useState<string>('');

  const setTxtRecord = useCallback((txtRecord: string) => {
    setCurrentTxtRecord(txtRecord);
    setCurrentStep('text-record');
  }, []);

  const value = useMemo<DomainVerificationContextType>(
    () => ({
      currentStep,
      txtRecord: currentTxtRecord,
      domainAddress,
      userRole,
      setDomainAddress,
      setTxtRecord,
      setCurrentStep,
    }),
    [currentStep, currentTxtRecord, domainAddress, userRole, setTxtRecord],
  );

  return (
    <DomainVerificationContext.Provider value={value}>
      {children}
    </DomainVerificationContext.Provider>
  );
};

export const useDomainVerificationContext = () => {
  const context = useContext(DomainVerificationContext);

  if (!context) {
    throw new Error(
      'useDomainVerificationContext must be used within the DomainVerificationContextProvider',
    );
  }

  return context;
};
