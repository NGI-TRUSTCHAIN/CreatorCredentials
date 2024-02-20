import Joi from 'joi';
import { LoginFormContextType } from './LoginForm.types';

export const LoginFormSchema = Joi.object<LoginFormContextType>().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label('e-mail')
    .required()
    .messages({
      'string.empty': 'Please enter your e-mail address.',
      'string.email': 'Please provide a valid e-mail address.',
    }),
});
