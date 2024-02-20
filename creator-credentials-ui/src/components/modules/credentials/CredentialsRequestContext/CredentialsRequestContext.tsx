import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useStepper } from '@/shared/hooks/useStepper';
import { IssuerWithVerifiedCredentials } from '@/shared/typings/Issuer';
import { useSelect } from '@/shared/hooks/useSelect';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { CREDENTIALS_REQUEST_STEPS_TKEYS } from '../CredentialsRequestStepper';
import { CredentialsRequestContextType } from './CredentialsRequestContext.types';

export const CredentialsRequestContext =
  createContext<CredentialsRequestContextType | null>(null);

type CredentialsRequestContextProviderProps = {
  children: React.ReactNode;
  preSelectedIssuerId: string | null;
};

export const CredentialsRequestContextProvider = ({
  children,
  preSelectedIssuerId,
}: CredentialsRequestContextProviderProps) => {
  const stepper = useStepper({ steps: CREDENTIALS_REQUEST_STEPS_TKEYS });
  const [selectedIssuer, setSelectedIssuer] =
    useState<IssuerWithVerifiedCredentials | null>(null);
  const credentials = useSelect<Omit<VerifiedCredentialsUnion, 'id'>>({
    singleSelection: true,
  });

  const toggleIssuerSelection = useCallback(
    (issuer: IssuerWithVerifiedCredentials) => {
      if (selectedIssuer?.id === issuer.id) {
        setSelectedIssuer(null);
      } else {
        setSelectedIssuer(issuer);
      }
    },
    [selectedIssuer?.id],
  );

  const value = useMemo<CredentialsRequestContextType>(
    () => ({
      stepper,
      credentials,
      preSelectedIssuerId,
      selectedIssuer,
      toggleIssuerSelection,
    }),
    [
      stepper,
      credentials,
      preSelectedIssuerId,
      selectedIssuer,
      toggleIssuerSelection,
    ],
  );

  return (
    <CredentialsRequestContext.Provider value={value}>
      {children}
    </CredentialsRequestContext.Provider>
  );
};

export const useCredentialsRequestContext = () => {
  const context = useContext(CredentialsRequestContext);

  if (!context) {
    throw new Error(
      'useCredentialsRequestContext must be used within the CredentialsRequestContextProvider',
    );
  }

  return context;
};
