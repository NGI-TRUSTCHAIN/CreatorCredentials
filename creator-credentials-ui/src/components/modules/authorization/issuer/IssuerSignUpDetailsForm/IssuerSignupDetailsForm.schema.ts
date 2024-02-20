import Joi from 'joi';
import { IssuerSignupDetailsFormContextType } from './IssuerSignupDetailsForm.types';

export const IssuerSignupDetailsFormSchema =
  Joi.object<IssuerSignupDetailsFormContextType>().keys({
    domain: Joi.string().domain({ tlds: false }).label('Web domain').required(),
    companyName: Joi.string().label('Company name').required(),
  });
