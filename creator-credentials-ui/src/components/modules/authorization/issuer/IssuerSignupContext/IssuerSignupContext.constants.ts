import { IssuerSignupContextFormSteps } from './IssuerSignupContext.types';

export const DefaultIssuerSignupContextFormStepsValues: IssuerSignupContextFormSteps =
  {
    details: {
      domain: '',
      companyName: '',
    },
    email: {
      address: '',
      termsAndConditions: false,
    },
  };
