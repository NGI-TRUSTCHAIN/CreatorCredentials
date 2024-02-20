import Joi from 'joi';
import { CreatorCredentialVisibilityFormContextType } from './CreatorCredentialVisibilityForm.types';

export const CreatorCredentialVisibilityFormSchema =
  Joi.object<CreatorCredentialVisibilityFormContextType>().keys({
    showAll: Joi.boolean().required(),
    email: Joi.boolean().required(),
    wallet: Joi.boolean().required(),
    domain: Joi.boolean().required(),
  });
