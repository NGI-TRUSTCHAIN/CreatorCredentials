import Joi from 'joi';
import { CreatorSignupFormContextType } from './CreatorSignupFormContextType';

export const CreatorSignupFormSchema =
  Joi.object<CreatorSignupFormContextType>().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label('e-mail')
      .required()
      .messages({
        'string.empty': 'Please enter your e-mail address.',
        'string.email': 'Please provide a valid e-mail address.',
      }),
    termsAndConditions: Joi.boolean().required(),
  });
