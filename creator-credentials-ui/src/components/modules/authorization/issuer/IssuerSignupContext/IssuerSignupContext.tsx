import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  IssuerSignupContextType,
  IssuerSignupContextUpdateStepHandler,
} from './IssuerSignupContext.types';
import { DefaultIssuerSignupContextFormStepsValues } from './IssuerSignupContext.constants';

export const IssuerSignupContext =
  createContext<IssuerSignupContextType | null>(null);

type IssuerSignupContextProviderProps = {
  children: React.ReactNode;
};

export const IssuerSignupContextProvider = ({
  children,
}: IssuerSignupContextProviderProps) => {
  const [formSteps, setFormSteps] = useState(
    DefaultIssuerSignupContextFormStepsValues,
  );

  const updateStep: IssuerSignupContextUpdateStepHandler = useCallback(
    (step, value) => {
      setFormSteps((prev) => ({
        ...prev,
        [step]: value,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      formSteps,
      updateStep,
    }),
    [formSteps, updateStep],
  );

  return (
    <IssuerSignupContext.Provider value={value}>
      {children}
    </IssuerSignupContext.Provider>
  );
};

export const useIssuerSignupContext = () => {
  const context = useContext(IssuerSignupContext);

  if (!context) {
    throw new Error(
      'useIssuerSignupContext must be used within the IssuerSignupContextProvider',
    );
  }

  return context;
};
