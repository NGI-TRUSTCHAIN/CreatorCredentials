import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { UserRole } from '@/shared/typings/UserRole';
import {
  DidWebVerificationContextType,
  DidWebVerificationStep,
} from './DidWebVerificationContextType';

export const DidWebVerificationContext =
  createContext<DidWebVerificationContextType | null>(null);

type IssuerSignupContextProviderProps = {
  children: React.ReactNode;
  userRole: UserRole;
};

export const DidWebVerificationContextProvider = ({
  children,
  userRole,
}: IssuerSignupContextProviderProps) => {
  const [currentStep, setCurrentStep] =
    useState<DidWebVerificationStep>('domain');
  const [currentJsonFileContent, setCurrentJsonFileContent] =
    useState<string>('');
  const [domainAddress, setDomainAddress] = useState<string>('');

  const setJsonFileContent = useCallback((txtRecord: string) => {
    setCurrentJsonFileContent(txtRecord);
    setCurrentStep('json-file');
  }, []);

  const value = useMemo<DidWebVerificationContextType>(
    () => ({
      currentStep,
      currentJsonFileContent,
      domainAddress,
      userRole,
      setDomainAddress,
      setJsonFileContent,
      setCurrentStep,
    }),
    [
      currentJsonFileContent,
      currentStep,
      domainAddress,
      setJsonFileContent,
      userRole,
    ],
  );

  return (
    <DidWebVerificationContext.Provider value={value}>
      {children}
    </DidWebVerificationContext.Provider>
  );
};

export const useDidWebVerificationContext = () => {
  const context = useContext(DidWebVerificationContext);

  if (!context) {
    throw new Error(
      'useDidWebVerificationContext must be used within the DidWebVerificationContextProvider',
    );
  }

  return context;
};
