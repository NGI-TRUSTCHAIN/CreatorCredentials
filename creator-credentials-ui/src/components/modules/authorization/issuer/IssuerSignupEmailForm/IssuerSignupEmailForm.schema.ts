import Joi from 'joi';
import { IssuerSignupEmailFormContextType } from './IssuerSignupEmailForm.types';

export const IssuerSignupEmailFormSchema =
  Joi.object<IssuerSignupEmailFormContextType>().keys({
    address: Joi.string().email({ tlds: false }).required().messages({
      'string.empty': 'Please enter your e-mail address.',
      'string.email': 'Please provide a valid e-mail address.',
    }),
    termsAndConditions: Joi.boolean().required(),
  });
