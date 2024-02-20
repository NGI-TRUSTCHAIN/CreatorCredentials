import { useCredentialsRequestContext } from '../CredentialsRequestContext';
import { CredentialsRequestDataConfirmation } from '../CredentialsRequestDataConfirmation';
import { CredentialsRequestSelectCredentials } from '../CredentialsRequestSelectCredentials';
import { CredentialsRequestSelectIssuer } from '../CredentialsRequestSelectIssuer';

export const CredentialsRequestMultiStep = () => {
  const { stepper } = useCredentialsRequestContext();

  return (
    <section className="flex flex-1 flex-col">
      {stepper.activeStep === 0 && <CredentialsRequestSelectCredentials />}
      {stepper.activeStep === 1 && <CredentialsRequestSelectIssuer />}
      {stepper.activeStep === 2 && <CredentialsRequestDataConfirmation />}
    </section>
  );
};
