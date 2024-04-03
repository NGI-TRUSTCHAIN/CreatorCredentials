import { UseSelectReturnType } from '@/shared/hooks/useSelect';
import { UseStepperReturnType } from '@/shared/hooks/useStepper';
import { IssuerWithVerifiedCredentials } from '@/shared/typings/Issuer';
import { VerifiedCredentialsTemplate } from '@/shared/typings/Templates';

export type CredentialsRequestContextType = {
  stepper: UseStepperReturnType;
  templates: UseSelectReturnType<Omit<VerifiedCredentialsTemplate, 'id'>>;
  preSelectedIssuerId: string | null;
  selectedIssuer: IssuerWithVerifiedCredentials | null;
  toggleIssuerSelection: (issuer: IssuerWithVerifiedCredentials) => void;
};
