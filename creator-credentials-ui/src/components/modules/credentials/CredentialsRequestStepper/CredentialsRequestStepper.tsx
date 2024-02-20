import { useTranslation } from '@/shared/utils/useTranslation';
import { Stepper } from '@/components/shared/Stepper';

export const CREDENTIALS_REQUEST_STEPS_TKEYS = [
  'steps.select-credential.label',
  'steps.select-issuer.label',
  'steps.confirm-data.label',
];

type CredentialsRequestStepperProps = {
  activeStep: number;
};

export const CredentialsRequestStepper = ({
  activeStep,
}: CredentialsRequestStepperProps) => {
  const { t } = useTranslation('creator-credentials-request');

  return (
    <Stepper
      steps={CREDENTIALS_REQUEST_STEPS_TKEYS.map((tKey) => t(tKey))}
      activeStep={activeStep}
      className="mt-7"
    />
  );
};
