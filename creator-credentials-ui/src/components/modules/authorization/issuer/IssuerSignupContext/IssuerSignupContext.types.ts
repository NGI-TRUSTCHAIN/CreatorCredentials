export type IssuerSignupContextFormSteps = {
  details: {
    domain: string;
    companyName: string;
  };
  email: {
    address: string;
    termsAndConditions: boolean;
  };
};

export type IssuerSignupFormStep = keyof IssuerSignupContextFormSteps;

export type IssuerSignupContextUpdateStepHandler = <
  T extends IssuerSignupFormStep,
>(
  step: T,
  value: IssuerSignupContextFormSteps[T],
) => void;

export type IssuerSignupContextType = {
  formSteps: IssuerSignupContextFormSteps;
  updateStep: IssuerSignupContextUpdateStepHandler;
};
