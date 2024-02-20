import { UseSelectReturnType } from '@/shared/hooks/useSelect';
import { UseStepperReturnType } from '@/shared/hooks/useStepper';
import { VerifiedCredentialsUnion } from '@/shared/typings/Credentials';
import { IssuerWithVerifiedCredentials } from '@/shared/typings/Issuer';

export type CredentialsRequestContextType = {
  stepper: UseStepperReturnType;
  credentials: UseSelectReturnType<Omit<VerifiedCredentialsUnion, 'id'>>;
  preSelectedIssuerId: string | null;
  selectedIssuer: IssuerWithVerifiedCredentials | null;
  toggleIssuerSelection: (issuer: IssuerWithVerifiedCredentials) => void;
};
